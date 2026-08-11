import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    const message = await prisma.message.findUnique({ where: { id } });

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    await prisma.message.delete({ where: { id } });

    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("DELETE Message Error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
