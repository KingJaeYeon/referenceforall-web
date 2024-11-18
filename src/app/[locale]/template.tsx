"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { usePathname } from "@/i18n/routing";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  let path = pathname;

  if (pathname.includes("/tag")) {
    path = "tag";
  }

  if (pathname.includes("/search")) {
    path = "search";
  }

  if (pathname.includes("/my/lists")) {
    path = "my/lists";
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      key={path}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      {children}
    </motion.div>
  );
}
