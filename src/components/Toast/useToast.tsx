import { toast } from "sonner";
import InfoToast from "@/components/Toast/InfoToast";
import ErrorToast from "@/components/Toast/ErrorToast";
import SuccessToast from "@/components/Toast/SuccessToast";
import ActionToast from "@/components/Toast/ActionToast";
import React from "react";

export function useToast() {
  function info(msg: string) {
    const id = toast(
      <InfoToast
        msg={msg}
        onClose={() => {
          toast.dismiss(id);
        }}
      />,
      {
        className: "border border-[#42E22A] bg-[#42E22A4D]",
      },
    );

    return id;
  }

  function error(msg: string) {
    return toast(<ErrorToast msg={msg} />, {
      className: "border border-[#D84F68] bg-[#D84F684D]",
    });
  }

  function success(msg: string) {
    return toast(<SuccessToast msg={msg} />, {
      className: "border border-[#4EBE96] bg-[#4EBE964D]",
    });
  }

  function action(msg: string, onClick: () => void) {
    return toast.custom(
      (t) => <ActionToast msg={msg} onClick={onClick} t={t} />,
      {
        className:
          "border border-[#4EBE96] bg-[#4EBE964D] p-[0px] cursor-pointer",
        duration: Infinity,
      },
    );
  }

  return {
    info,
    error,
    success,
    action,
  };
}
