"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const { push } = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-10 text-center">
      <div className="mx-auto w-full max-w-[546px]">
        <h4 className="text-default-900 heading1 pb-6">유효한 세션이 아닙니다.</h4>
      </div>
      <div className="mx-auto w-full max-w-[300px]">
        <Button
          variant={"primary"}
          font={"body4"}
          onClick={() => push("/")}
        >
          Go to homepage
        </Button>
      </div>
    </div>
  );
}
