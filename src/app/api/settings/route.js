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
    const formData = await request.formData();
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const avatarFile = formData.get("avatar");
    
    let user = await prisma.user.findFirst();
    
    const dataToUpdate = { fullName, email };
    
    // Process password if provided
    if (password && password.trim() !== "") {
      const bcrypt = require("bcryptjs");
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }
    
    // Process avatar if provided
    if (avatarFile && typeof avatarFile !== "string") {
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const buffer = Buffer.from(await avatarFile.arrayBuffer());
      const upload = await uploadToCloudinary(buffer, "portfolio/admin");
      dataToUpdate.avatar = upload.secure_url;
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
          ...dataToUpdate
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
