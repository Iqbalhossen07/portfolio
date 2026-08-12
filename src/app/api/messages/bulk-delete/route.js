import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid request. No IDs provided." }, { status: 400 });
    }

    await prisma.message.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: "Messages deleted successfully" });
  } catch (error) {
    console.error("Bulk Delete Messages Error:", error);
    return NextResponse.json({ error: "Failed to delete messages" }, { status: 500 });
  }
}
