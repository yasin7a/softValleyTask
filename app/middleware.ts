import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  let cookie = request.cookies.get("auth");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (cookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/")) {
    if (!cookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
