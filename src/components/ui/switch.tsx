"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { IconMoon, IconSun } from "@/assets/svg/IconTheme";
import { useTheme } from "next-themes";
import { cva, VariantProps } from "class-variance-authority";

const switchVariants = cva(
  "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "h-[24px] w-[60px] data-[state=checked]:bg-switch-on-switch data-[state=unchecked]:bg-switch-off-switch",
        theme: "h-[24px] w-[50px] bg-switch-theme-switch",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  hasLabel?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, hasLabel = true, variant, ...props }, ref) => {
  const isChecked = props.checked;

  return (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ variant, className }))}
      {...props}
      ref={ref}
    >
      {variant === "theme" ? (
        <SwitchThemeThumb />
      ) : (
        <>
          <SwitchThumb />
          {hasLabel && <SwitchLabel isChecked={!!isChecked} />}
        </>
      )}
    </SwitchPrimitives.Root>
  );
});

const SwitchThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>
>(({ className, children, ...props }, ref) => (
  <SwitchPrimitives.Thumb
    ref={ref}
    className={cn(
      "pointer-events-none block h-[20px] w-[20px] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-0.5 data-[state=unchecked]:translate-x-9 data-[state=checked]:bg-switch-on-thumb data-[state=unchecked]:bg-switch-off-thumb",
      className,
    )}
    {...props}
  >
    {children}
  </SwitchPrimitives.Thumb>
));

const SwitchThemeThumb = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Thumb>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Thumb>
>(({ className, children, ...props }, ref) => {
  const { theme } = useTheme();
  return (
    <SwitchPrimitives.Thumb
      ref={ref}
      className={cn(
        "pointer-events-none flex h-[20px] w-[20px] items-center justify-center rounded-full bg-switch-theme-thumb shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-0.5 data-[state=unchecked]:translate-x-7",
        className,
      )}
      {...props}
    >
      {theme === "dark" ? (
        <IconSun className={"h-[14px] w-[14px] text-[hsla(0_0%_36%)]"} />
      ) : (
        <IconMoon className={"h-[14px] w-[14px] text-white"} />
      )}
    </SwitchPrimitives.Thumb>
  );
});

const SwitchLabel = ({ isChecked }: { isChecked: boolean }) => (
  <div
    className={cn(
      "body8 absolute",
      isChecked
        ? "right-3 text-switch-on-thumb"
        : "left-1.5 text-switch-off-thumb",
    )}
  >
    {isChecked ? "ON" : "OFF"}
  </div>
);

Switch.displayName = SwitchPrimitives.Root.displayName;
SwitchThumb.displayName = SwitchPrimitives.Thumb.displayName;
SwitchThemeThumb.displayName = SwitchPrimitives.Thumb.displayName;

export { Switch, switchVariants };
