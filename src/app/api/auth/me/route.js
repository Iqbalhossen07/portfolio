import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_development"
);

export async function GET(req) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, SECRET_KEY);

    // Fetch fresh user data from DB to ensure avatar and name are up-to-date
    const dbUser = await prisma.user.findUnique({
      where: { id: Number(payload.id) },
      select: { id: true, email: true, fullName: true, avatar: true }
    });

    return NextResponse.json({ user: dbUser || payload }, { status: 200 });
  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
