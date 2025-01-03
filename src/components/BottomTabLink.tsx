"use client";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React from "react";
import Col from "@/components/Layout/Col";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string | string[];
  icon: React.ReactNode;
}

export default function BottomTabLink(props: NavLinkProps) {
  const { children, className, href, icon } = props;
  const path = usePathname();
  const link = typeof href === "string" ? href : href[0];
  const isIncludes =
    typeof href === "string"
      ? path.startsWith(href)
      : path.startsWith(href[0]) || path.startsWith(href[1]);
  return (
    <Link
      href={link}
      role={"link"}
      className={cn(
        "heading9 flex select-none flex-col items-center gap-1 whitespace-nowrap rounded-full text-gray-800",
        className,
        isIncludes ? "" : "opacity-50",
      )}
    >
      <Col className={"min-h-[22px]"}>{icon}</Col>
      {children}
    </Link>
  );
}
