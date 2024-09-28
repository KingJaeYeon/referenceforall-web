import React from "react";
import { useTheme } from "next-themes";

export function IconError({ className }: { className?: string }) {
  const { theme } = useTheme();

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="18"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke={theme === "light" ? "#D84F68" : "#D84F68"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6.414v3.403m0 3.403h.008M8.546 2.041L1.34 14.071a1.702 1.702 0 001.455 2.553h14.412a1.701 1.701 0 001.455-2.553l-7.206-12.03a1.701 1.701 0 00-2.91 0z"
      ></path>
    </svg>
  );
}
