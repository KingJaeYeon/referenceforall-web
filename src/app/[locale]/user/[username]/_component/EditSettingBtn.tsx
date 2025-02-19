"use client";
import useUserStore from "@/store/userStore";

import { Row } from "@/components/layout";
import NavLink from "@/components/NavLink";
import React from "react";

export function EditSettingBtn({ userId }: { userId: string }) {
  const { user } = useUserStore();
  const isSelf = userId === user.id;
  if (!isSelf) {
    return;
  }
  return (
    <Row>
      <NavLink className={"heading4 rounded-[10px] bg-gray-200 px-4 py-3 font-medium"} href={"/my/setting"}>
        Edit Profile
      </NavLink>
    </Row>
  );
}
