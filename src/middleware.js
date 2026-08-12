import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback_secret_for_development"
);

export async function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const url = req.nextUrl.clone();

  // Protect all /iqbal_07 routes except /iqbal_07/login or /login
  if (req.nextUrl.pathname.startsWith("/iqbal_07")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next();
    } catch (error) {
      // Invalid or expired token
      url.pathname = "/login";
      // Clear cookie
      const response = NextResponse.redirect(url);
      response.cookies.delete("auth_token");
      return response;
    }
  }

  // Prevent logged-in users from accessing /login
  if (req.nextUrl.pathname === "/login") {
    if (token) {
      try {
        await jwtVerify(token, SECRET_KEY);
        url.pathname = "/iqbal_07";
        return NextResponse.redirect(url);
      } catch (error) {
        // Just let them stay on login page if token is invalid
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/iqbal_07/:path*", "/login"],
};
