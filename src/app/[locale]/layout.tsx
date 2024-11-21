import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { notoSansKR, pretendard } from "@/app/fonts/fonts";
import NavigationHeader from "@/components/NavigationHeader";
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
import NavigationBottom from "@/components/NavigationBottom";

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

export default async function RootLayout(
  props: Readonly<{
    children: ReactNode;
    params: { locale: string };
  }>,
) {
  const params = await props.params;

  const { locale } = params;

  const { children } = props;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const cookieStore = await cookies();
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
              <Col className={"relative min-h-[100dvh]"}>
                <Toaster />
                <NavigationHeader />
                {children}
                <GlobalModal />
              </Col>
              <NavigationBottom />
            </QueryProvider>
          </SystemProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
