import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import Header from "@/components/Header";
import SystemProvider from "@/provider/SystemProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import QueryProvider from "@/provider/QueryProvider";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Viewport } from "next";
import Col from "@/components/Layout/Col";
import { cookies } from "next/headers";
import { parsePayload } from "@/util/util";
import GlobalModal from "@/components/modal/GlobalModal";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const cookieStore = cookies();
  const access = cookieStore.get("Authorization");
  let user = parsePayload(access?.value);
  user = { id: "cm3ifq9yr0001adx98mojy0lp", accountId: "wodus331" };

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${pretendard.variable} ${notoSansKR.className} bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          <SystemProvider user={user}>
            <QueryProvider>
              <Col className={"h-full min-h-[100dvh]"}>
                <Toaster />
                <Header />
                {children}
                <GlobalModal />
              </Col>
            </QueryProvider>
          </SystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
