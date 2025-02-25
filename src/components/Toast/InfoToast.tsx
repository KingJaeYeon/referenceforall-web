import React from "react";
import { Row } from "@/components/layout";
import { IconClose } from "@/assets/svg";

type Props = {
  className?: string;
  msg: string;
  onClose: () => void;
};

function InfoToast({ msg, onClose }: Props) {
  return (
    <Row className={"relative w-full items-center justify-center"}>
      {msg}
      <Row
        className={
          "absolute right-0 cursor-pointer items-center justify-center"
        }
        onClick={() => {
          onClose();
        }}
      >
        <IconClose />
      </Row>
    </Row>
  );
}

export default InfoToast;
