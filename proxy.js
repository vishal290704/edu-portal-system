import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

const routePermissions = {
  "/admin": ["SUPER_ADMIN", "ADMIN"],
  "/teacher": ["TEACHER"],
  "/student": ["STUDENT"],
};

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

  // Find the protected route
  const matchedRoute = Object.keys(routePermissions).find((route) =>
    pathname.startsWith(route)
  );

  // Route is public
  if (!matchedRoute) {
    return NextResponse.next();
  }

  // Check token
  const token = request.cookies.get("des_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check role
// Check role
const allowedRoles = routePermissions[matchedRoute];

if (!allowedRoles.includes(payload.role)) {
  switch (payload.role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return NextResponse.redirect(
        new URL("/admin", request.url)
      );

    case "TEACHER":
      return NextResponse.redirect(
        new URL("/teacher", request.url)
      );

    case "STUDENT":
      return NextResponse.redirect(
        new URL("/student", request.url)
      );

    default:
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/student/:path*",
  ],
};