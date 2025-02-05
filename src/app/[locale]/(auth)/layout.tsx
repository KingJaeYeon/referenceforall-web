import { cookies } from "next/headers";
import { parsePayload } from "@/util/util";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Authorization } from "@/config";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const cookieStore = await cookies();
  const access = cookieStore.get(Authorization);
  let user = parsePayload(access?.value);

  if (!user) {
    return notFound();
  }

  return <>{children}</>;
}
