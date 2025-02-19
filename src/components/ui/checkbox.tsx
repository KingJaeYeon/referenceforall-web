"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Row } from "@/components/layout";
import { IconCheck } from "@/assets/svg";
import { Label } from "@/components/ui/label";

interface CheckboxType extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  htmlFor?: string;
  label?: string;
}

const Checkbox = React.forwardRef<React.ComponentRef<typeof CheckboxPrimitive.Root>, CheckboxType>(
  ({ className, label, checked = false, disabled = false, onCheckedChange, htmlFor, ...props }, ref) => (
    <Row className={"items-center gap-[10px]"}>
      <CheckboxPrimitive.Root
        ref={ref}
        id={htmlFor}
        disabled={disabled}
        data-state={checked ? "checked" : "unchecked"}
        checked={checked}
        onCheckedChange={(e) => onCheckedChange && onCheckedChange(e === "indeterminate" ? true : e)}
        className={cn(
          "peer h-[24px] w-[24px] shrink-0 rounded-[5px] border border-check-border disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-check-active-border data-[state=checked]:bg-check-active data-[state=checked]:text-check-active-icon data-[state=unchecked]:text-check-icon",
          className,
        )}
        {...props}
      >
        <Row className={"items-center justify-center"}>
          <IconCheck />
        </Row>
      </CheckboxPrimitive.Root>
      {label && (
        <Label className={"cursor-pointer"} htmlFor={htmlFor} font={"body3"}>
          {label}
        </Label>
      )}
    </Row>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
