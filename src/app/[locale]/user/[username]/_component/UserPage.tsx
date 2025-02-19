"use client";
import useUserStore from "@/store/userStore";
import { Col, Row } from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { AboutMe } from "@/app/[locale]/user/[username]/_component/AboutMe";
import { EditSettingBtn } from "@/app/[locale]/user/[username]/_component/EditSettingBtn";
import { LinkList } from "@/app/[locale]/user/[username]/_component/LinkList";
import ScrollTabs from "@/components/ScrollTabs";
import { useTranslation } from "@/app/i18n/client";

export default function UserPage({ fetchUser }: { fetchUser: any }) {
  const { user } = useUserStore();
  const { i18n } = useTranslation();
  return (
    <Col className={"w-full max-w-[700px] items-center"}>
      <Col className={"w-full items-center justify-between py-8 md:flex-row"}>
        <Col className={"items-center md:flex-row"}>
          <Avatar className="h-28 w-28">
            <AvatarImage src={user.icon} alt={user.author} />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>

          <Col className={"mb-10 mt-6 gap-2 md:mb-0 md:ml-8 md:mt-0"}>
            <p className={"heading1 text-center font-semibold md:text-left"}>{user.displayName}</p>
            <Row className={"gap-4"}>
              <button className={"body5 text-gray-500"}>0 posts</button>
              <button className={"body5 text-gray-500"}>0 bookmarks</button>
              <button className={"body5 text-gray-500"}>0 comments</button>
            </Row>
            <p className={"body5 text-gray-500"}>출석체크 0</p>
          </Col>
        </Col>
        <EditSettingBtn isSelf={fetchUser.id === user.id} />
      </Col>
      <ScrollTabs
        tabs={[
          { label: "About", url: `/${i18n.language}/@${user.displayName}` },
          { label: "Library", url: `/${i18n.language}/@${user.displayName}/list` },
          { label: "Posts", url: `/${i18n.language}/@${user.displayName}/posts` },
          { label: "Comments", url: `/${i18n.language}/@${user.displayName}/comments` },
        ]}
      />
      <AboutMe aboutMe={user.aboutMe} isSelf={fetchUser.id === user.id} />
      <LinkList />
    </Col>
  );
}
