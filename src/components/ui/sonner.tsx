"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import IconConfirm from "@/assets/svg/IconConfirm";
import IconError from "@/assets/svg/IconError";
import React from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group w-[90%] max-w-[1300px]"
      position={"top-center"}
      icons={{
        success: <IconConfirm />,
        error: <IconError />,
      }}
      toastOptions={{
        unstyled: true,
        className:
          "flex flex-row gap-3 items-center justify-center p-3 rounded-lg text-foreground border w-full md:max-w-[1300px] backdrop-blur heading5",
      }}
      {...props}
    />
  );
};

export { Toaster };
