"use client";
import Link from "next/link";
import Google from "@/assets/Google";
import { useTranslations } from "next-intl";

export default function Logo() {
  const t = useTranslations();
  return (
    <Link href={"/"} className={"flex items-center"}>
      <Google className={"h-[29px] w-[24px]"} />
      <span className={"heading4 ml-2 mt-1"}>{t("logo")}</span>
    </Link>
  );
}
