import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/auth.middleware";

export const config = {
  //   matcher: "/api/admin/:path*",
  matcher: ["/api/admin"],
};

export default function middleware(req: Request) {
  const authResult = authMiddleware(req);
  console.log("aaaaa", req);

  const isProtectedUrl = req.url.includes("/api/admin");

  //   const isProtectedUrl = config.matcher.some((uri: string) =>
  //     req.url.includes(uri)
  //   );

  if (!authResult.isValid && req.url.includes("/api/admin")) {
    return NextResponse.json(
      {
        message: "Unhautorized",
      },
      { status: 401 }
    );
  }
  return NextResponse.next();
}
