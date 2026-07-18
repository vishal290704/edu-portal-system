import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Public Routes
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("des_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin Area
  if (pathname.startsWith("/admin")) {
    if (
      payload.role !== "SUPER_ADMIN" &&
      payload.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Teacher Area
  if (pathname.startsWith("/teacher")) {
    if (payload.role !== "TEACHER") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
  ],
};