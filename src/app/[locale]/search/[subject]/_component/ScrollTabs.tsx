"use client";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight } from "@/assets/svg";
import React, { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function ScrollTabs({
  tabs,
  query,
}: {
  tabs: { label: string; url: string }[];
  query?: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth <= scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkForScrollPosition);
      window.addEventListener("resize", checkForScrollPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkForScrollPosition);
        window.removeEventListener("resize", checkForScrollPosition);
      }
    };
  }, []);

  const scrollByAmount = (amount: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    scrollByAmount(-100);
  };

  const handleScrollRight = () => {
    scrollByAmount(100);
  };

  return (
    <Row
      className={
        "relative mb-[38px] border-b border-gray-200 mb:mt-[12px] tb:mb-[46px] tb:mt-[22px]"
      }
    >
      <Row
        ref={scrollContainerRef}
        className={
          "scrollNone overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
        style={{ scrollBehavior: "smooth" }}
      >
        {tabs.map((tab) => {
          const { label, url } = tab;
          return (
            <LinkButton href={`${url}?q=${query}`} lastPath={url} key={label}>
              {label}
            </LinkButton>
          );
        })}

        {canScrollLeft && (
          <Row
            className={
              "scroller-x-left absolute bottom-[1px] left-0 pr-[30px] duration-100 mb:pr-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
              className={"px-0 pb-[16px]"}
            >
              <IconChevronLeft className={"h-[16px] w-[16px]"} />
            </Button>
          </Row>
        )}
        {canScrollRight && (
          <Row
            className={
              "scroller-x-right absolute bottom-[1px] right-0 pl-[30px] duration-100 mb:pl-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollRight}
              aria-label="Scroll Right"
              className={"px-0 pb-[16px]"}
            >
              <IconChevronRight className={"h-[16px] w-[16px]"} />
            </Button>
          </Row>
        )}
      </Row>
    </Row>
  );
}

function LinkButton({
  children,
  href,
  lastPath,
}: {
  children: React.ReactNode;
  href: string;
  lastPath: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        "body5 mr-[32px] w-fit pb-[16px] capitalize tb:mr-6",
        pathname === lastPath && "border-b border-gray-900",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
