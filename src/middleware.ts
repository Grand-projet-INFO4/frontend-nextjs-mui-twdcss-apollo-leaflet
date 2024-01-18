import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const {pathname} = req.nextUrl;

  const reqHeaders = new Headers(req.headers)
  reqHeaders.set("x-pathname", pathname);

  let res = NextResponse.next({
    request: {
      headers: reqHeaders
    }
  });
  return res;
}
