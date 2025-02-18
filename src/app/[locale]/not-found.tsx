"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function NotFound() {
  const { push } = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background py-20 text-center">
      <Image src="/404-2.svg" alt="" height={300} width={300} />
      <div className="mx-auto mt-12 w-full max-w-[546px]">
        <h4 className="text-default-900 mb-4">Page not found</h4>
        <div className="mb-10 text-base font-normal dark:text-white">
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.
        </div>
      </div>
      <div className="mx-auto w-full max-w-[300px]">
        <Button
          variant={"secondary"}
          rounded={"full"}
          font={"body4"}
          onClick={() => push("/")}
        >
          Go to homepage
        </Button>
      </div>
    </div>
  );
}
