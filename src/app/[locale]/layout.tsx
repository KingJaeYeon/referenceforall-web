import type { Metadata } from "next";
import { Viewport } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import NavigationHeader from "@/components/NavigationHeader";
import SystemProvider from "@/provider/SystemProvider";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import QueryProvider from "@/provider/QueryProvider";
import { routing } from "@/i18n/routing";
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

  if (!routing.locales.includes(p.locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(p.locale);

  let user = await getJwtPayload();
  const messages = await getMessages();

  return (
    <html lang={p.locale}>
      <body className={`${pretendard.variable} ${notoSansKR.className} min-h-[100dvh] bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages}>
          <SystemProvider user={user}>
            <QueryProvider>
              <Toaster />
              <NavigationHeader user={user} />
              {children}
              <GlobalModal />
              <NavigationBottom />
            </QueryProvider>
          </SystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
