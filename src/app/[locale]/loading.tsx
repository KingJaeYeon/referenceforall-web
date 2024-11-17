import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader2 className={"h-10 w-10 animate-spin"} />
    </div>
  );
}
