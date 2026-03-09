import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Protect /portal/* routes
  if (pathname.startsWith("/portal")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (session.user.role === "PENDING") {
      return NextResponse.redirect(new URL("/auth/pending", req.url));
    }
  }

  // Protect /admin/* routes
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }
  }

  // Forward pathname as header so server layouts can read it
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
});

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
