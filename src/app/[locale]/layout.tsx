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

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${pretendard.variable} ${notoSansKR.className} bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          <SystemProvider>
            <QueryProvider>
              <Toaster />
              <Header />
              {children}
            </QueryProvider>
          </SystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
