import React, { useEffect, useRef, useState } from "react";
import Row from "@/components/Layout/Row";
import { cn } from "@/lib/utils";
import { useSpring, animated } from "@react-spring/web";

type Props = {
  state: string;
  setState: (state: string) => void;
  className?: string;
  wrapperClassName?: string;
  list: {
    label: any;
    value: string;
  }[];
};

export default function ButtonSwitcher({
  state,
  setState,
  className,
  list,
  wrapperClassName,
}: Props) {
  const itemRefs = useRef<any>([]);
  const [sliderStyle, setSliderStyle] = useState({ width: "0px", left: "0px" });

  const animatedStyle = useSpring({
    width: sliderStyle.width,
    left: sliderStyle.left,
    config: { tension: 300, friction: 30 }, // You can adjust these for smoother or snappier animations
  });

  useEffect(() => {
    const activeIndex = list.findIndex((item) => item.value === state);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];
      if (activeItem) {
        const { offsetWidth, offsetLeft } = activeItem;
        setSliderStyle({
          width: `${offsetWidth}px`,
          left: `${offsetLeft}px`,
        });
      }
    }
  }, [state, list]);

  return (
    <Row className={cn("relative rounded-full bg-button-secondary p-[3px]")}>
      <animated.div
        className={cn(
          "z-2 absolute left-[3px] top-[50%] h-[26px] translate-y-[-50%] rounded-full bg-card",
          wrapperClassName,
        )}
        style={animatedStyle}
      />
      {list.map((item, index) => {
        return (
          <Row
            ref={(el: any) => (itemRefs.current[index] = el)}
            className={cn(
              `heading7 z-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full px-3`,
              state === item.value ? "" : "text-placeholder02",
              className,
            )}
            key={`group-${item.value}`}
            onClick={() => setState(item.value)}
          >
            {item.label}
          </Row>
        );
      })}
    </Row>
  );
}
