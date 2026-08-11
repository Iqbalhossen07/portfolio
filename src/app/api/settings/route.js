import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }
    // Don't send the password back
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user settings" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;
    
    let user = await prisma.user.findFirst();
    
    const dataToUpdate = { fullName, email };
    // Only update password if a new one is provided
    if (password && password.trim() !== "") {
      dataToUpdate.password = password; // Note: In a real app, hash this password!
    }

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: dataToUpdate,
      });
    } else {
      user = await prisma.user.create({
        data: {
          fullName,
          email,
          password: password || "123456", // Default fallback if creating first user
        },
      });
    }
    
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ message: "Settings updated successfully", user: safeUser });
  } catch (error) {
    console.error("PUT Settings Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
