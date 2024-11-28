import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // 요청 경로 출력
  const pathname = request.nextUrl.pathname;

  // 커스텀 헤더로 pathname 전달
  const response = intlMiddleware(request);
  response.headers.set("x-pathname", pathname); // 헤더에 경로 추가
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ko|en|jp|cn)/:path*"],
};
