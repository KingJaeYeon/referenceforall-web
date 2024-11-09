"use client";
import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontType } from "@/util/fontType";

export default function TopicButton({
  children,
  href,
  lastPath,
  className,
  font = "body4",
}: {
  children: React.ReactNode;
  href: string;
  lastPath: string;
  className?: string;
  font?: FontType;
}) {
  const pathname = usePathname();
  const { push } = useRouter();
  const lastURL = decodeURI(pathname.split("/").pop() ?? "");
  return (
    <Button
      font={font}
      className={cn(
        "mr-3 w-fit px-4 capitalize tb:mr-6",
        className,
        lastURL === lastPath && "border border-gray-900",
      )}
      rounded={"full"}
      onClick={() => push(href)}
    >
      {children}
    </Button>
  );
}
