import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET() {
  try {
    const platforms = await prisma.platform.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(platforms);
  } catch (error) {
    console.error("GET Platforms Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch platforms" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") || "Untitled Platform";
    const link = formData.get("link") || null;
    const imageFile = formData.get("image");

    if (!imageFile || typeof imageFile === "string") {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const upload = await uploadToCloudinary(imageBuffer, "portfolio/platforms");

    const newPlatform = await prisma.platform.create({
      data: {
        name,
        link,
        imageUrl: upload.secure_url,
        imageId: upload.public_id,
      },
    });

    return NextResponse.json({ message: "Platform created successfully", platform: newPlatform }, { status: 201 });
  } catch (error) {
    console.error("POST Platforms Error:", error);
    return NextResponse.json(
      { error: "Failed to create platform", details: error.message },
      { status: 500 }
    );
  }
}
