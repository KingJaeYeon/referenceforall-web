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
import Text from "@/components/Layout/Text";

export default function RecommendTopicList() {
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
  const recommendTopics = [
    "Technology",
    "Blockchain",
    "Artificial Intelligence",
    "Programming",
    "Machine Learning",
    "Data Science",
    "Defi",
    "Tech",
    "Crypto",
    "Business2",
    "Business1",
    "Business3",
  ];

  return (
    <Row
      className={"relative mb-[30px] mb:mb-[50px] mb:mt-[12px] tb:mt-[22px]"}
    >
      <Row
        ref={scrollContainerRef}
        className={
          "scrollNone overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
        style={{ scrollBehavior: "smooth" }}
      >
        <LinkButton href={"/reference"} lastPath={"reference"}>
          <IconPlayerExpand />
          <Text className={"hidden tb:inline"}>Explore topics</Text>
        </LinkButton>

        {recommendTopics.map((topic) => (
          <LinkButton href={`/reference/${topic}`} lastPath={topic} key={topic}>
            {topic}
          </LinkButton>
        ))}

        {canScrollLeft && (
          <Row
            className={
              "scroller-x-left absolute pr-[30px] duration-100 mb:pr-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
              className={"px-0 mb:px-3"}
            >
              <IconChevronLeft />
            </Button>
          </Row>
        )}
        {canScrollRight && (
          <Row
            className={
              "scroller-x-right absolute right-0 pl-[30px] duration-100 mb:pl-[42px]"
            }
          >
            <Button
              variant={"default"}
              onClick={handleScrollRight}
              aria-label="Scroll Right"
              className={"px-0 mb:px-3"}
            >
              <IconChevronRight />
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
  const { push } = useRouter();
  const lastURL = decodeURI(pathname.split("/").pop() ?? "");
  return (
    <Button
      font={"body4"}
      className={cn(
        "mr-3 w-fit px-4 tb:mr-6",
        lastURL === lastPath && "border border-gray-900",
      )}
      rounded={"full"}
      onClick={() => push(href)}
    >
      {children}
    </Button>
  );
}
