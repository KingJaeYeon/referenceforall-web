import { Bio } from "@/app/[locale]/user/[username]/_component/Bio";
import { LinkList } from "@/app/[locale]/user/[username]/_component/LinkList";
import React from "react";
import { fetchUserProfileDetail } from "@/service/user-service";
import { getJwtPayload } from "@/util/jwt-payload";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ locale: string; username: string }> }) {
  const { username, locale } = await params;
  const decodeDisplayName = decodeURIComponent(username).slice(1);
  try {
    const result = await fetchUserProfileDetail({ displayName: decodeDisplayName }).then((r) => r.data);
    const user = result.data;
    const payload = await getJwtPayload();

    return (
      <React.Fragment>
        <Bio bio={user.bio} isMine={payload?.id === user?.id} locale={locale} displayName={decodeDisplayName}/>
        <LinkList links={user.links} />
      </React.Fragment>
    );
  } catch {
    notFound();
  }
}
