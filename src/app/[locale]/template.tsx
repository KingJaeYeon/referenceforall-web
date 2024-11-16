"use client";

import { motion } from "framer-motion";
import React from "react";
import { usePathname } from "@/i18n/routing";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let path = pathname;

  if (pathname.includes("/tag")) {
    path = "tag";
  }

  if (pathname.includes("/search")) {
    path = "search";
  }

  return (
    <motion.div
      key={path}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={"flex flex-1 flex-col"}
    >
      {children}
    </motion.div>
  );
}
