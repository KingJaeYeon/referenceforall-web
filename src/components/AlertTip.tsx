import Row from "@/components/Layout/Row";
import React from "react";

export function AlertTip({ label }: { label: string }) {
  return (
    <Row className={"items-center pt-2 text-[#b3261e]"}>
      <CircleAlert />
      <p className={"body7"}>{label}</p>
    </Row>
  );
}

function CircleAlert() {
  return (
    <svg
      aria-hidden="true"
      className="Qk3oof xTjuxe mr-2"
      fill="currentColor"
      focusable="false"
      width="16px"
      height="16px"
      viewBox="0 0 24 24"
      xmlns="https://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
    </svg>
  );
}
