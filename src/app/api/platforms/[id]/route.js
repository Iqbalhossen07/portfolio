import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(request, { params }) {
  const { id } = await params; // Next.js 15+ needs await on params

  try {
    const platform = await prisma.platform.findUnique({
      where: { id: parseInt(id) },
    });

    if (!platform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 });
    }

    if (platform.imageId) {
      await deleteFromCloudinary(platform.imageId);
    }

    await prisma.platform.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Platform deleted successfully" });
  } catch (error) {
    console.error("DELETE Platform Error:", error);
    return NextResponse.json(
      { error: "Failed to delete platform" },
      { status: 500 }
    );
  }
}
