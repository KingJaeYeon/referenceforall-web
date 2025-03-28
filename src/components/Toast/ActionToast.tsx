import React from "react";
import { Row } from "@/components/layout";
import { toast } from "sonner";
import { IconDelete } from "@/assets/svg";

type Props = {
  className?: string;
  msg: string;
  onClick: () => void;
  t: string | number;
};

function ActionToast({ msg, onClick, t }: Props) {
  return (
    <Row
      className={"relative w-full items-center justify-center gap-[15px] p-3"}
      onClick={() => {
        onClick();
        toast.dismiss(t);
      }}
    >
      {msg}
      <div
        className={"absolute right-[15px] top-[9px]"}
        onClick={(event) => {
          event.stopPropagation();
          toast.dismiss(t);
        }}
      >
        <IconDelete />
      </div>
    </Row>
  );
}
export default ActionToast;
