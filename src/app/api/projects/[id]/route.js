import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET Single Project Error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const existingProject = await prisma.project.findUnique({ where: { id } });

    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const formData = await request.formData();
    
    // Parse fields
    const title = formData.get("title") || existingProject.title;
    const type = formData.get("type") || existingProject.type;
    const category = formData.get("category") || existingProject.category;
    const liveLink = formData.get("liveLink") || existingProject.liveLink;
    const githubLink = formData.get("githubLink") || existingProject.githubLink;
    const shortDescription = formData.get("shortDescription") || existingProject.shortDescription;
    const year = formData.get("year") || existingProject.year;
    const duration = formData.get("duration") || existingProject.duration;
    const problemTitle = formData.get("problemTitle") || existingProject.problemTitle;
    const problemDescription = formData.get("problemDescription") || existingProject.problemDescription;
    const solutionTitle = formData.get("solutionTitle") || existingProject.solutionTitle;
    const solutionDescription = formData.get("solutionDescription") || existingProject.solutionDescription;
    
    // Parse JSON fields
    const problemPoints = formData.get("problemPoints") ? JSON.parse(formData.get("problemPoints")) : existingProject.problemPoints;
    const solutionPoints = formData.get("solutionPoints") ? JSON.parse(formData.get("solutionPoints")) : existingProject.solutionPoints;
    const techs = formData.get("techs") ? JSON.parse(formData.get("techs")) : existingProject.techs;
    const features = formData.get("features") ? JSON.parse(formData.get("features")) : existingProject.features;
    const results = formData.get("results") ? JSON.parse(formData.get("results")) : existingProject.results;
    
    // Process mainImage update if provided
    let mainImageUrl = existingProject.mainImageUrl;
    let mainImageId = existingProject.mainImageId;
    
    const mainImageFile = formData.get("mainImage");
    if (mainImageFile && typeof mainImageFile !== "string") {
      // Delete old image
      if (mainImageId) await deleteFromCloudinary(mainImageId);
      
      // Upload new image
      const buffer = Buffer.from(await mainImageFile.arrayBuffer());
      const upload = await uploadToCloudinary(buffer, "portfolio/projects");
      mainImageUrl = upload.secure_url;
      mainImageId = upload.public_id;
    }

    // Handle gallery retention and deletion
    const retainedGallery = formData.get("retainedGallery") ? JSON.parse(formData.get("retainedGallery")) : [];
    const deletedGalleryIds = formData.get("deletedGalleryIds") ? JSON.parse(formData.get("deletedGalleryIds")) : [];
    
    // Delete removed images from cloudinary
    for (const publicId of deletedGalleryIds) {
      if (publicId) await deleteFromCloudinary(publicId);
    }

    const galleryFiles = formData.getAll("galleryFiles");
    const galleryCaptions = formData.getAll("galleryCaptions");
    let galleryUploads = [...retainedGallery];
    
    // Append new files
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

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title, type, category, liveLink, githubLink, shortDescription,
        year, duration, problemTitle, problemDescription, solutionTitle, solutionDescription,
        problemPoints, solutionPoints, techs, features, results,
        mainImageUrl, mainImageId, gallery: galleryUploads
      },
    });

    return NextResponse.json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    console.error("PUT Project Error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (project.mainImageId) {
      await deleteFromCloudinary(project.mainImageId);
    }
    
    if (project.gallery && Array.isArray(project.gallery)) {
      for (const img of project.gallery) {
        if (img.id) await deleteFromCloudinary(img.id);
      }
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE Project Error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
