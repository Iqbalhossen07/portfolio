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

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const link = formData.get("link") || null;
    const imageFile = formData.get("image");

    const platformId = parseInt(id);
    const existingPlatform = await prisma.platform.findUnique({ where: { id: platformId } });

    if (!existingPlatform) {
      return NextResponse.json({ error: "Platform not found" }, { status: 404 });
    }

    let updateData = {};
    if (name) updateData.name = name;
    if (formData.has("link")) updateData.link = link; // update if link field was sent (even if empty)

    if (imageFile && typeof imageFile !== "string") {
      // New image uploaded
      if (existingPlatform.imageId) {
        await import("@/lib/cloudinary").then(m => m.deleteFromCloudinary(existingPlatform.imageId));
      }
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const upload = await import("@/lib/cloudinary").then(m => m.uploadToCloudinary(imageBuffer, "portfolio/platforms"));
      updateData.imageUrl = upload.secure_url;
      updateData.imageId = upload.public_id;
    }

    const updatedPlatform = await prisma.platform.update({
      where: { id: platformId },
      data: updateData,
    });

    return NextResponse.json({ message: "Platform updated successfully", platform: updatedPlatform });
  } catch (error) {
    console.error("PUT Platform Error:", error);
    return NextResponse.json({ error: "Failed to update platform" }, { status: 500 });
  }
}
