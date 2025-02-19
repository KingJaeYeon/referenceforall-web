import { ComponentProps, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Col } from "@/components/layout";

type Props = {
  children?: ReactNode | ReactNode[];
  className?: string;
} & ComponentProps<"div">;

export const PageWrapper = forwardRef<HTMLDivElement, Props>(({ children, className, ...props }, ref) => {
  return (
    <Col ref={ref} className={cn(`items-center`, className)} {...props}>
      {children}
    </Col>
  );
});

PageWrapper.displayName = "PageWrapper";
