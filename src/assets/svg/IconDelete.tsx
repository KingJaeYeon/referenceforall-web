import React from "react";
import { cn } from "@/lib/utils";

export function IconDelete({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10214_56281)">
        <path
          d="M11.4 6.6L6.6 11.4M6.6 6.6L11.4 11.4M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10214_56281">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
