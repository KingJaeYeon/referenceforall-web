import { AboutMe } from "@/app/[locale]/user/[username]/_component/AboutMe";
import { LinkList } from "@/app/[locale]/user/[username]/_component/LinkList";
import React from "react";
import { fetchAboutUser } from "@/service/user-service";
import { getJwtPayload } from "@/util/jwt-payload";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: Promise<{ locale: string; username: string }> }) {
  const { username } = await params;
  const decodeDisplayName = decodeURIComponent(username).slice(1);
  try {
    const result = await fetchAboutUser({ displayName: decodeDisplayName }).then((r) => r.data);
    const user = result.data;
    const payload = await getJwtPayload();

    return (
      <React.Fragment>
        <AboutMe aboutMe={user.aboutMe} isMine={payload.id === user?.id} />
        <LinkList links={user.links} />
      </React.Fragment>
    );
  } catch {
    notFound();
  }
}
