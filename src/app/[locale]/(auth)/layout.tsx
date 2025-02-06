import { getJwtPayload } from "@/util/jwt-payload";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  let user = getJwtPayload();

  if (!user) {
    return notFound();
  }

  return <>{children}</>;
}
