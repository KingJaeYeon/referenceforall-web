import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loading2 } from "@/assets/svg";
import { FontType, utilFont } from "@/util/fontType";

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
        sm: "h-[29px] rounded-[6px] px-[8px]",
        md: "h-[38px] rounded-[8px] px-[12px]",
        lg: "h-[42px] rounded-[10px] px-[20px]",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "",
        full: "rounded-[999px]",
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
  font?: FontType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading = false,
      disabled = false,
      rounded,
      children,
      variant = "secondary",
      rightIcon,
      leftIcon,
      size = "md",
      asChild = false,
      font,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const customFont = utilFont(font, () => {
      if (size === "sm") return "heading8";
      if (size === "lg") return "heading5";
      return "heading7";
    });
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded }),
          customFont,
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {leftIcon && leftIcon}
        {loading && <Loading2 className={'animate-spin h-3.5 w-3.5'}/>}
        {children}
        {rightIcon && rightIcon}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
