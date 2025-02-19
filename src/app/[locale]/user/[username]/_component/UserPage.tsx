"use client";
import useUserStore from "@/store/userStore";
import { Col ,Row} from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { AboutMe } from "@/app/[locale]/user/[username]/_component/AboutMe";
import { EditSettingBtn } from "@/app/[locale]/user/[username]/_component/EditSettingBtn";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IconLink } from "@/assets/svg";

export default function UserPage({ fetchUser }: { fetchUser: any }) {
  const { user } = useUserStore();
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
      <AboutMe aboutMe={user.aboutMe} isSelf={fetchUser.id === user.id} />
      <Col className={"mb-10 w-full"}>
        <Label font={"heading6"} className={"font-medium"}>
          LINK
        </Label>
        <Row className={"mt-2 gap-4"}>
          <Link className={"flex items-center"} href={"http://localhost:3000"}>
            <IconLink className={"h-3 w-3"} /> <p className={"body5 ml-2"}>twitter </p>
          </Link>
          <Link className={"flex items-center"} href={"http://localhost:3000"}>
            <IconLink className={"h-3 w-3"} /> <p className={"body5 ml-2"}>twitter </p>
          </Link>
        </Row>
      </Col>
    </Col>
  );
}
