"use client";
import React from "react";
import Link from "next/link";
import Google from "@/assets/Google";

function Logo() {
  return (
    <Link href={"/"} className={"flex items-center"}>
      <Google className={"h-[29px] w-[24px]"} />
      <span className={"heading4"}>ReferenceForAll</span>
    </Link>
  );
}

export default Logo;
