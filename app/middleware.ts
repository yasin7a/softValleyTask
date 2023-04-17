import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  let cookie = request.cookies.get("auth");

  if (request.nextUrl.pathname.startsWith('/login') && cookie) {
    return NextResponse.rewrite(new URL('/about-2', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/') && !cookie) {
    return NextResponse.rewrite(new URL('/login', request.url))
  }

  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
