import React, { ComponentProps, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
} & ComponentProps<"div">;

const Main = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(`flex flex-col items-center`, className)}
        {...props}
      >
        {children}
      </main>
    );
  },
);

Main.displayName = "Main";

export default Main;
