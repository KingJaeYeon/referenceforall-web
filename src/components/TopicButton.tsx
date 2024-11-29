"use client";
import { ReactNode } from "react";
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
  children: ReactNode;
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
        "mr-2 w-fit px-4 capitalize md:mr-2",
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
