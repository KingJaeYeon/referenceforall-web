import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loading2 } from "@/assets/svg";

const buttonVariants = cva(
  "gap-[6px] inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-20",
  {
    variants: {
      variant: {
        default: "",
        primary:
          "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover disabled:text-button-primary-disabled-foreground",
        secondary:
          "bg-button-secondary text-button-secondary-foreground hover:bg-button-secondary-hover hover:text-button-secondary-hover-foreground",
        outline:
          "border-button-outline-border border bg-transparent text-button-outline-foreground hover:text-button-outline-hover hover:border-button-outline-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-[29px] rounded-[6px] px-[8px] heading8",
        md: "h-[32px] rounded-[6px] px-[12px] heading7",
        lg: "h-[42px] rounded-[10px] px-[20px] heading5",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "default";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading = false,
      disabled = false,
      children,
      variant = "secondary",
      rightIcon,
      leftIcon,
      size = "md",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {leftIcon && leftIcon}
        {loading && <Loading2 />}
        {children}
        {rightIcon && rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
