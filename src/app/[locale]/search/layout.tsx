import React from "react";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Contents>{children}</Contents>
    </Main>
  );
}
