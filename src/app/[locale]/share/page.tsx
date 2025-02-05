import React from "react";
import SiteShareForm from "@/app/[locale]/share/_component/SharePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share to Site",
  description: "Share to Site",
};
export default function SharePage() {
  return <SiteShareForm />;
}
