import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET Messages Error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userName, userEmail, userPhone, userDescription } = body;

    if (!userName || !userEmail || !userDescription) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        userName,
        userEmail,
        userPhone: userPhone || "",
        userDescription,
      },
    });

    return NextResponse.json({ message: "Message sent successfully", data: newMessage }, { status: 201 });
  } catch (error) {
    console.error("POST Message Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
