"use client";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerExpand,
} from "@/assets/svg";
import React, { useEffect, useRef, useState } from "react";

export default function RecommendTopicList() {
  const popularTopic = [
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
    <Row className={"relative mb-[50px] mt-[42px]"}>
      <Row
        ref={scrollContainerRef}
        className={
          "scrollNone overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
        style={{ scrollBehavior: "smooth" }}
      >
        <Button font={"body4"} className={"mr-6 w-fit px-4"} rounded={"full"}>
          <IconPlayerExpand /> Explore topics
        </Button>
        {popularTopic.map((topic) => (
          <Button
            font={"body4"}
            className={"mr-2 w-fit px-4"}
            rounded={"full"}
            key={topic}
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
