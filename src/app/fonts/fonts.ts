import localFont from "next/font/local";
import { Noto_Sans_KR } from "next/font/google";

export const pretendard = localFont({
  src: "./PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard", // css 변수로 등록하기 위함
});

export const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
