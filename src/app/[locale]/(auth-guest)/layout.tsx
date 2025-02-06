import { getJwtPayload } from "@/util/jwt-payload";
import { ReactNode } from "react";
import { redirect } from "@/i18n/routing";

interface Props {
  children: ReactNode | ReactNode[];
  params: Promise<{ locale: string }>;
}

export default async function AuthGuestLayout({ children, params }: Props) {
  const p = await params;
  let user = await getJwtPayload();

  if (!!user) {
    return redirect({ href: "/", locale: p.locale });
  }

  return <div>{children}</div>;
}
