"use client";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import React from "react";
import Col from "@/components/Layout/Col";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  icon: React.ReactNode;
}

export default function BottomTabLink(props: NavLinkProps) {
  const { children, className, href, icon } = props;
  const path = usePathname();
  return (
    <Link
      href={href}
      role={"link"}
      className={cn(
        "heading9 flex select-none flex-col items-center gap-1 whitespace-nowrap rounded-full text-gray-800",
        className,
        path.startsWith(href) ? "" : "opacity-50",
      )}
    >
      <Col className={"min-h-[22px]"}>{icon}</Col>
      {children}
    </Link>
  );
}
