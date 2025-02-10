"use client";
import Link from "next/link";
import Google from "@/assets/Google";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function FullLogo() {
  const t = useTranslations();
  return (
    <Link href={"/"} className={"flex items-center whitespace-nowrap"}>
      <Google className={"h-[29px] w-[24px]"} />
      <span className={"heading4 ml-2 mt-1"}>{t("logo")}</span>
    </Link>
  );
}

export function Logo({ isLink, className }: { isLink?: boolean; className?: string }) {
  if (isLink) {
    return (
      <Link href={"/"} className={"flex items-center whitespace-nowrap"}>
        <Google className={"h-[29px] w-[24px]"} />
      </Link>
    );
  }

  return <Google className={cn("h-[29px] w-[24px]", className)} />;
}
