"use client";
import React from "react";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function SystemProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    // <LocaleProvider>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </ThemeProvider>
    // </LocaleProvider>
  );
}
