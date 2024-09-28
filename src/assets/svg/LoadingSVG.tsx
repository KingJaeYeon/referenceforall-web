"use client";
import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Loading1({ className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("animate-spinner text-icon", className)}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 1.333V5.6m0 12.8v4.266M4.459 4.458l3.018 3.019m9.046 9.045l3.018 3.019M1.333 12H5.6m12.8 0h4.267M4.459 19.54l3.018-3.019m9.046-9.045l3.018-3.019"
      ></path>
    </svg>
  );
}

export function Loading2({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spinner h-[18px] w-[18px] text-icon", className)}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9 11C21.5075 11 22.0057 11.4937 21.945 12.0982C21.7657 13.8858 21.1505 15.6082 20.1462 17.1113C18.9375 18.9202 17.2195 20.3301 15.2095 21.1627C13.1995 21.9952 10.9878 22.2131 8.85401 21.7886C6.72022 21.3642 4.7602 20.3166 3.22183 18.7782C1.68345 17.2398 0.635799 15.2798 0.211362 13.146C-0.213076 11.0122 0.0047612 8.80047 0.837325 6.79048C1.66989 4.7805 3.07979 3.06253 4.88873 1.85383C6.39177 0.849532 8.11422 0.234305 9.90179 0.0549502C10.5063 -0.00569955 11 0.492487 11 1.1C11 1.70751 10.5056 2.19291 9.90283 2.26866C8.55114 2.43851 7.25203 2.92064 6.11098 3.68307C4.66383 4.65002 3.53591 6.0244 2.86986 7.63239C2.20381 9.24038 2.02954 11.0098 2.36909 12.7168C2.70864 14.4238 3.54676 15.9918 4.77746 17.2225C6.00816 18.4532 7.57617 19.2914 9.28321 19.6309C10.9902 19.9705 12.7596 19.7962 14.3676 19.1301C15.9756 18.4641 17.35 17.3362 18.3169 15.889C19.0794 14.748 19.5615 13.4489 19.7313 12.0972C19.8071 11.4944 20.2925 11 20.9 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CardLoading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-loader [&amp;:nth-child(3)]:m-0 me-[6px] h-[8px] w-[8px] rounded-full bg-icon"></div>
      <div className="animate-loader [&amp;:nth-child(3)]:m-0 me-[6px] h-[8px] w-[8px] rounded-full bg-icon delay-100"></div>
      <div className="animate-loader [&amp;:nth-child(3)]:m-0 me-[6px] h-[8px] w-[8px] rounded-full bg-icon delay-200"></div>
    </div>
  );
}
