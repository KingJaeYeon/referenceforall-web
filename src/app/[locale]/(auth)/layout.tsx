import React from "react";
import { cookies } from "next/headers";
import { parsePayload } from "@/util/util";
import { notFound } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const cookieStore = cookies();
  const access = cookieStore.get("Authorization");
  let user = parsePayload(access?.value);
  user = { id: "cm3ifq9yr0001adx98mojy0lp", accountId: "wodus331" };

  if (!user) {
    return notFound();
  }

  return <>{children}</>;
}
