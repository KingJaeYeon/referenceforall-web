import { ReactNode } from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import { languages } from "@/app/i18n/settings";
import { notFound } from "next/navigation";
import { SystemProvider } from "@/provider";
import { getJwtPayload } from "@/util/jwt-payload";
import { Viewport } from "next";
import "@/app/globals.css";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Layout({ children, params }: Readonly<LayoutProps>) {
  const p = await params;

  if (!languages.includes(p.locale as any)) {
    notFound();
  }

  let payload = await getJwtPayload();

  return (
    <html lang={p.locale}>
      <body className={`${pretendard.variable} ${notoSansKR.className} min-h-[100dvh] bg-background text-foreground`}>
      <SystemProvider payload={payload}>
        {children}
      </SystemProvider>
      </body>
    </html>
  );
}
