import { ComponentProps, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children?: ReactNode | ReactNode[];
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
