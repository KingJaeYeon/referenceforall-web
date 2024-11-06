import React, { forwardRef } from "react";
import Col from "@/components/Layout/Col";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const Contents = forwardRef<HTMLDivElement, Props>(
  ({ children, className }, ref) => {
    return (
      <Col
        ref={ref}
        className={cn(
          `mb-[50px] w-full max-w-[1240px] px-4 mb:mb-0 dt:px-0`,
          className,
        )}
      >
        {children}
      </Col>
    );
  },
);

Contents.displayName = "Contents";

export default Contents;
