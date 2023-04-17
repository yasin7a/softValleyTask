import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let cookie = request.cookies.get("auth");
  



  if (pathname.startsWith("/_next")) return NextResponse.next();


  if (pathname === "/login" && cookie) {
    request.nextUrl.pathname = "/";
    return NextResponse.redirect(request.nextUrl);
  }



  if (pathname === "/" && !cookie) {
    request.nextUrl.pathname = "/login";
    return NextResponse.redirect(request.nextUrl);
  }






  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.png).*)"],
};
