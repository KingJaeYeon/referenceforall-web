import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import { getJwtPayload } from "@/util/jwt-payload";
import GlobalModal from "@/components/modal/GlobalModal";
import NavigationBottom from "@/components/NavigationBottom";
import React from "react";

export const metadata: Metadata = {
  title: "ReferenceForAll",
  description: "ReferenceForAll",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  let payload = await getJwtPayload();

  return (
    <React.Fragment>
      <Toaster />
      <NavigationHeader payload={payload} />
      {children}
      <GlobalModal />
      <NavigationBottom />
    </React.Fragment>
  );
}
