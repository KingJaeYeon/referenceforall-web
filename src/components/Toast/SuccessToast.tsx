import React from "react";
import Row from "@/components/Layout/Row";
import { IconConfirm } from "@/assets/svg";

type Props = {
  className?: string;
  msg: string;
};

function SuccessToast({ msg }: Props) {
  return (
    <Row className={"relative w-full items-center justify-center"}>
      <Row
        className={"absolute left-0 cursor-pointer items-center justify-center"}
      >
        <IconConfirm />
      </Row>
      {msg}
    </Row>
  );
}
export default SuccessToast;
