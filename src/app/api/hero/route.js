import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hero = await prisma.hero.findFirst();
    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hero data" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const formData = await request.formData();
    const cvText = formData.get("cvText") || "Download CV";
    let cvLink = formData.get("cvLink") || "";
    
    let hero = await prisma.hero.findFirst();
    let cvFileId = hero?.cvFileId || null;
    
    const cvFile = formData.get("cvFile");
    
    if (cvFile && typeof cvFile !== "string") {
      // If there is a new file, upload it to Cloudinary
      // Delete old file if exists
      if (cvFileId) {
        const { deleteFromCloudinary } = await import("@/lib/cloudinary");
        await deleteFromCloudinary(cvFileId);
      }
      
      const { uploadToCloudinary } = await import("@/lib/cloudinary");
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      const upload = await uploadToCloudinary(buffer, "portfolio/cv");
      cvLink = upload.secure_url;
      cvFileId = upload.public_id;
    }

    if (hero) {
      hero = await prisma.hero.update({
        where: { id: hero.id },
        data: { cvText, cvLink, cvFileId },
      });
    } else {
      hero = await prisma.hero.create({
        data: { cvText, cvLink, cvFileId },
      });
    }
    
    return NextResponse.json({ message: "Hero updated successfully", hero });
  } catch (error) {
    console.error("PUT Hero Error:", error);
    return NextResponse.json({ error: "Failed to update hero data" }, { status: 500 });
  }
}
