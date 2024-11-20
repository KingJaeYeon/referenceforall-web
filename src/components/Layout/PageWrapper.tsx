import { ComponentProps, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Col from "@/components/Layout/Col";

type Props = {
  children?: ReactNode | ReactNode[];
  className?: string;
} & ComponentProps<"div">;

const PageWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <Col ref={ref} className={cn(`items-center`, className)} {...props}>
        {children}
      </Col>
    );
  },
);

PageWrapper.displayName = "PageWrapper";

export default PageWrapper;
