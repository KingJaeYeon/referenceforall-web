import * as React from "react";
import { cn } from "@/lib/utils";
import { IconSearch } from "@/assets/svg/IconSearch";
import { IconDelete } from "@/assets/svg/IconDelete";
import { FontType, utilFont } from "@/util/fontType";
import { Row, Text } from "@/components/layout";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "search" | "delete" | "length";
  iconOnClick?: () => void;
  errorMessage?: string;
  hasError?: boolean;
  rounded?: "default" | "full";
  font?: FontType;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className, //
      type,
      rounded = "default",
      icon,
      iconOnClick,
      maxLength = 255,
      disabled = false,
      value,
      errorMessage,
      hasError,
      font,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const customFont = utilFont(font, () => "body5 placeholder:body5");
    return (
      <Row className={cn("relative h-[42px] w-full items-center", className, disabled && "cursor-not-allowed")}>
        <input
          type={type}
          className={cn(
            "placeholder:body4 flex h-full w-full rounded-[4px] border border-input-border bg-input px-[12px] py-2 placeholder:text-input-placeholder hover:border-input-focus-border focus:border-input-focus-border focus-visible:outline-none disabled:pointer-events-none disabled:border-input-disabled-border disabled:text-input-disabled-foreground disabled:placeholder:opacity-20",
            !!icon ? "pr-[65px]" : "",
            errorMessage && "border-red hover:border-red focus:border-red",
            hasError && "border-destructive hover:border-destructive focus:border-destructive",
            rounded === "full" && "rounded-full",
            customFont,
            inputClassName,
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          disabled={disabled}
          {...props}
        />
        <InputIcon icon={icon} iconOnClick={iconOnClick} maxLength={maxLength} disabled={disabled} value={value} />
        {errorMessage && <Text className={"body7 pl-2 text-destructive"}>{errorMessage}</Text>}
      </Row>
    );
  },
);
Input.displayName = "Input";

export { Input };

function InputIcon({
  icon,
  iconOnClick,
  maxLength,
  disabled,
  value,
}: {
  icon?: "search" | "delete" | "length";
  iconOnClick?: () => void;
  maxLength?: number;
  disabled?: boolean;
  value?: any;
}) {
  if (!icon) {
    return null;
  }

  if (icon === "length") {
    return (
      <div className={cn("absolute right-[14px] top-[8px]")}>
        <Text className="body5 pt-[3px] text-gray-500">
          {`${!value?.length ? 0 : value?.length} `}
          <span className="text-gray-neutral">{`/ ${maxLength}`}</span>
        </Text>
      </div>
    );
  }

  return (
    <div
      className={cn("absolute right-[14px] top-[11px]", disabled ? "opacity-10" : "cursor-pointer")}
      onClick={iconOnClick}
    >
      {icon === "search" && <IconSearch className={"h-[20px] w-[20px]"} />}
      {!!value && value.length > 0 && icon === "delete" && <IconDelete className={"h-[20px] w-[20px]"} />}
    </div>
  );
}
