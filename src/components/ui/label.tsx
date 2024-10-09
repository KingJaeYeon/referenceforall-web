"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FontType, utilFont } from "@/util/fontType";

interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  variant?: "default" | "accent";
  font?: FontType;
}

const labelVariants = cva(
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-icon",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, font, ...props }, ref) => {
  const customFont = utilFont(font, () => "body6");
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className, customFont)}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
