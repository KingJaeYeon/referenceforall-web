import React from "react";
import { Header } from "@/app/[locale]/tag/[topic]/_component/Header";

export default async function Layout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ topic: string }>;
}) {
  const params = await _params;
  const topic = decodeURI(params.topic);

  return (
    <>
      <Header topic={topic} />
      {children}
    </>
  );
}
