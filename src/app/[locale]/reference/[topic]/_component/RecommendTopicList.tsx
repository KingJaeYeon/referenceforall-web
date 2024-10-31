"use client";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerExpand,
} from "@/assets/svg";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function RecommendTopicList({
  recommendTopics,
}: {
  recommendTopics: string[];
}) {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { push } = useRouter();

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

  const lastURL = decodeURI(pathname.split("/").pop() ?? "");
  return (
    <Row className={"relative mb-[50px] mt-[42px]"}>
      <Row
        ref={scrollContainerRef}
        className={
          "scrollNone overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
        style={{ scrollBehavior: "smooth" }}
      >
        <Button
          font={"body4"}
          className={cn(
            "mr-6 w-fit px-4",
            lastURL === "reference" && "border border-gray-900",
          )}
          rounded={"full"}
          onClick={() => push("/reference")}
        >
          <IconPlayerExpand /> Explore topics
        </Button>
        {recommendTopics.map((topic) => (
          <Button
            font={"body4"}
            className={cn(
              "mr-2 w-fit px-4",
              lastURL === topic && "border border-gray-900",
            )}
            rounded={"full"}
            key={topic}
            onClick={() => push(`/reference/${topic}`)}
          >
            {topic}
          </Button>
        ))}
        {canScrollLeft && (
          <Row
            className={
              "scroller-x-left absolute pr-[30px] duration-100 sm:pr-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
              className={"px-0 sm:px-3"}
            >
              <IconChevronLeft />
            </Button>
          </Row>
        )}
        {canScrollRight && (
          <Row
            className={
              "scroller-x-right absolute right-0 pl-[30px] duration-100 sm:pl-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollRight}
              aria-label="Scroll Right"
              className={"px-0 sm:px-3"}
            >
              <IconChevronRight />
            </Button>
          </Row>
        )}
      </Row>
    </Row>
  );
}
