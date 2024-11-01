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
      if (width >= 1280 && type !== "dt") return true;
      if (width <= 1280 && width > 769 && type !== "tb") return true;
      return width <= 769 && type !== "mb";
    } else {
      if (width >= 1280 && type === "dt") return true;
      if (width <= 1280 && width > 769 && type === "tb") return true;
      return width <= 769 && type === "mb";
    }
  })();

  return shouldRender ? <>{children}</> : null;
}
