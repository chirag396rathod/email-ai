// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Adjust this secret to match NEXTAUTH_SECRET
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Only run on /api/flows and its sub‑routes
  if (!req.nextUrl.pathname.startsWith("/api/flows")) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization") || "";
  const match = authHeader.match(/^Bearer\s+(.*)$/i);
  const token = await getToken({ req, secret, raw: match[1] });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // token contains user id / email; you can attach it to headers if needed
  return NextResponse.next();
}

// Tell Next which paths the middleware should run on (better perf)
export const config = {
  matcher: ["/api/flows/:path*"],
};
