import type { Metadata } from "next";
import { Viewport } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import NavigationHeader from "@/components/NavigationHeader";
import { SystemProvider } from "@/provider";
import { notFound } from "next/navigation";
import { getJwtPayload } from "@/util/jwt-payload";
import GlobalModal from "@/components/modal/GlobalModal";
import NavigationBottom from "@/components/NavigationBottom";
import { languages } from "@/app/i18n/settings";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "ReferenceForAll",
  description: "ReferenceForAll",
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Readonly<LayoutProps>) {
  const p = await params;

  if (!languages.includes(p.locale as any)) {
    notFound();
  }

  let payload = await getJwtPayload();

  return (
    <html lang={p.locale}>
      <body className={`${pretendard.variable} ${notoSansKR.className} min-h-[100dvh] bg-background text-foreground`}>
        <SystemProvider payload={payload}>
          <Toaster />
          <NavigationHeader payload={payload} />
          {children}
          <GlobalModal />
          <NavigationBottom />
        </SystemProvider>
      </body>
    </html>
  );
}
