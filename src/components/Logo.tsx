"use client";
import React from "react";
import Link from "next/link";
import Google from "@/assets/Google";

export default function Logo() {
  return (
    <Link href={"/"} className={"flex items-center"}>
      <Google className={"h-[29px] w-[24px]"} />
      <span className={"heading4 ml-2 mt-1"}>모두의레퍼런스</span>
    </Link>
  );
}
