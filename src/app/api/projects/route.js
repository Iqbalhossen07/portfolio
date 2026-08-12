import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function GET(request) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET Projects Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Parse standard text fields
    const title = formData.get("title") || "Untitled Project";
    const type = formData.get("type") || "";
    const category = formData.get("category") || "Uncategorized";
    const liveLink = formData.get("liveLink") || "";
    const githubLink = formData.get("githubLink") || "";
    const shortDescription = formData.get("shortDescription") || "";
    const year = formData.get("year") || "";
    const duration = formData.get("duration") || "";
    const problemTitle = formData.get("problemTitle") || "";
    const problemDescription = formData.get("problemDescription") || "";
    const solutionTitle = formData.get("solutionTitle") || "";
    const solutionDescription = formData.get("solutionDescription") || "";
    
    // Parse JSON fields
    const problemPoints = formData.get("problemPoints") ? JSON.parse(formData.get("problemPoints")) : [];
    const solutionPoints = formData.get("solutionPoints") ? JSON.parse(formData.get("solutionPoints")) : [];
    const techs = formData.get("techs") ? JSON.parse(formData.get("techs")) : [];
    const features = formData.get("features") ? JSON.parse(formData.get("features")) : [];
    const results = formData.get("results") ? JSON.parse(formData.get("results")) : [];

    // Parse main image
    const mainImageFile = formData.get("mainImage");
    let mainImageUrl = "";
    let mainImageId = "";
    
    if (mainImageFile && typeof mainImageFile !== "string") {
      const mainImageBuffer = Buffer.from(await mainImageFile.arrayBuffer());
      const mainImageUpload = await uploadToCloudinary(mainImageBuffer, "portfolio/projects");
      mainImageUrl = mainImageUpload.secure_url;
      mainImageId = mainImageUpload.public_id;
    }

    // Parse gallery images (can be multiple files)
    const galleryFiles = formData.getAll("galleryFiles");
    const galleryCaptions = formData.getAll("galleryCaptions");
    const galleryUploads = [];
    
    for (let i = 0; i < galleryFiles.length; i++) {
      const file = galleryFiles[i];
      const caption = galleryCaptions[i] || "";
      if (typeof file !== "string") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const upload = await uploadToCloudinary(buffer, "portfolio/projects");
        galleryUploads.push({
          url: upload.secure_url,
          id: upload.public_id,
          caption: caption
        });
      }
    }

    // Save to Database via Prisma
    const newProject = await prisma.project.create({
      data: {
        title,
        type,
        category,
        liveLink,
        githubLink,
        shortDescription,
        year,
        duration,
        problemTitle,
        problemDescription,
        solutionTitle,
        solutionDescription,
        problemPoints,
        solutionPoints,
        techs,
        features,
        results,
        mainImageUrl,
        mainImageId,
        gallery: galleryUploads,
      },
    });

    return NextResponse.json({ message: "Project created successfully", project: newProject }, { status: 201 });
  } catch (error) {
    console.error("POST Projects Error:", error);
    return NextResponse.json(
      { error: "Failed to create project", details: error.message },
      { status: 500 }
    );
  }
}
