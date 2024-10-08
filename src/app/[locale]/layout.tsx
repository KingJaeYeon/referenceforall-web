import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import Header from "@/components/Header";
import SystemProvider from "@/provider/SystemProvider";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${pretendard.variable} ${notoSansKR.className} bg-background text-foreground`}
      >
        <NextIntlClientProvider messages={messages}>
          <SystemProvider>
            <Toaster />
            <Header />
            {children}
          </SystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}