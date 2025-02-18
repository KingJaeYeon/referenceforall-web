"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export default function NavLink({ children, href, className }: NavLinkProps) {
  const path = usePathname();
  return (
    <Link
      href={href}
      role={"link"}
      className={cn(
        "whitespace-nowrap rounded-full px-3 py-2 hover:bg-accent hover:text-accent-foreground",
        className,
        path.startsWith(href) ? "bg-gray-100" : "",
      )}
    >
      {children}
    </Link>
  );
}
