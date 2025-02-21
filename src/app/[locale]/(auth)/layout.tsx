import { getJwtPayload } from "@/util/jwt-payload";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  let user = await getJwtPayload();
  if (!user) {
    redirect('/')
  }

  return <>{children}</>;
}
