import { Row } from "@/components/layout";
import NavLink from "@/components/NavLink";
import React from "react";

export function EditSettingBtn({ isMine }: { isMine: boolean }) {
  if (!isMine) {
    return;
  }
  return (
    <Row>
      <NavLink className={"heading6 rounded-[5px] bg-gray-200 px-4 py-3 font-medium"} href={"/my/detail"}>
        Edit profile
      </NavLink>
    </Row>
  );
}
