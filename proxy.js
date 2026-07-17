import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("des_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      payload.role !== "SUPER_ADMIN" &&
      payload.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};