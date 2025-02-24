"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";
import { IconHelp, IconMoreInfo } from "@/assets/svg";

export default function Tip({
  children,
  className,
  trigger = "info",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "help" | "info";
}) {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger === "help" ? <IconMoreInfo /> : <IconHelp />}</TooltipTrigger>
      <TooltipContent className={className}>{children}</TooltipContent>
    </Tooltip>
  );
}
