import React from "react";
import Row from "@/components/Layout/Row";
import IconError from "@/assets/svg/IconError";

type Props = {
  className?: string;
  msg: string;
};

function ErrorToast({ msg }: Props) {
  return (
    <Row className={"relative w-full items-center justify-center"}>
      <Row
        className={"absolute left-0 cursor-pointer items-center justify-center"}
      >
        <IconError />
      </Row>
      {msg}
    </Row>
  );
}
export default ErrorToast;
