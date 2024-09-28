"use client";

import useWindowSize from "@/hook/useWindowSize";
import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  type: "dt" | "tb" | "mb";
  isReverse?: boolean; // New prop to handle reverse logic
};

export default function MediaWrapper({
  children,
  type,
  isReverse = false,
}: Props) {
  const { width } = useWindowSize();

  const shouldRender = (() => {
    if (isReverse) {
      if (width >= 1350 && type !== "dt") return true;
      if (width <= 1350 && width > 1023 && type !== "tb") return true;
      if (width <= 1023 && type !== "mb") return true;
      return false;
    } else {
      if (width >= 1350 && type === "dt") return true;
      if (width <= 1350 && width > 1023 && type === "tb") return true;
      if (width <= 1023 && type === "mb") return true;
      return false;
    }
  })();

  return shouldRender ? <>{children}</> : null;
}
