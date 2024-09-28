import React from "react";
import { useTheme } from "next-themes";

export function IconConfirm() {
  const { theme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={theme === "light" ? "#4EBE96" : "#4EBE96"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.889 9.188v.817a8.89 8.89 0 11-5.271-8.124m5.27 1.013L10 11.792 7.333 9.125"
      ></path>
    </svg>
  );
}
