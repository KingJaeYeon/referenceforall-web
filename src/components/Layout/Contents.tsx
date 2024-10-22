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
        className={cn(`w-full max-w-[1382px] px-4 sm:px-4`, className)}
      >
        {children}
      </Col>
    );
  },
);

Contents.displayName = "Contents";

export default Contents;
