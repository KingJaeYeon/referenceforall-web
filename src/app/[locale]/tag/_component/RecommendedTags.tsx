"use client";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight, IconCompass } from "@/assets/svg";
import { useEffect, useRef, useState } from "react";
import Text from "@/components/Layout/Text";
import TopicButton from "@/components/TopicButton";

export default function RecommendedTags({ tags }: { tags: any }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
      const { scrollLeft, scrollWidth, clientWidth } = container;

      if (scrollLeft + amount < 0) {
        amount = -scrollLeft;
      }
      if (scrollLeft + clientWidth + amount > scrollWidth) {
        amount = scrollWidth - clientWidth - scrollLeft;
      }

      container.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleScrollLeft = () => {
    scrollByAmount(-200);
  };

  const handleScrollRight = () => {
    scrollByAmount(200);
  };

  return (
    <Row className={"relative mb-[46px] mt-[22px]"}>
      <Row
        ref={scrollContainerRef}
        className={
          "scrollNone overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
        style={{ scrollBehavior: "smooth" }}
      >
        <TopicButton href={"/tag"} lastPath={"tag"} className={"px-2 md:mr-6"}>
          <IconCompass />
          <Text className={"hidden md:inline"}>Explore topics</Text>
        </TopicButton>

        {tags.map((topic: any) => (
          <TopicButton href={`/tag/${topic}`} lastPath={topic} key={topic}>
            {topic.split("-").join(" ")}
          </TopicButton>
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
              className={"px-0 sm:pr-3"}
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
              className={"px-0 sm:pl-3"}
            >
              <IconChevronRight />
            </Button>
          </Row>
        )}
      </Row>
    </Row>
  );
}
