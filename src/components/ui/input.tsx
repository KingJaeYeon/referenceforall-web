import * as React from "react";
import Text from "@/components/Layout/Text";
import { cn } from "@/lib/utils";
import { IconSearch } from "@/assets/svg/IconSearch";
import { IconDelete } from "@/assets/svg/IconDelete";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "none" | "search" | "delete" | "length";
  iconOnClick?: () => void;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className, //
      type,
      icon = "none",
      iconOnClick,
      maxLength = 30,
      disabled = false,
      value,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative w-full",
          className,
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          type={type}
          className={cn(
            "body4 placeholder:body4 border-input-border placeholder:text-input-placeholder hover:border-input-focus-border focus:border-input-focus-border disabled:border-input-disabled-border disabled:text-input-disabled-foreground flex h-[42px] w-full rounded-full border bg-input px-[20px] py-2 focus-visible:outline-none disabled:pointer-events-none disabled:placeholder:opacity-20",
            icon !== "none" ? "pr-[40px]" : "",
            errorMessage && "border-red hover:border-red focus:border-red",
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          disabled={disabled}
          {...props}
        />
        <InputIcon
          icon={icon}
          iconOnClick={iconOnClick}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
        />
        {errorMessage && (
          <Text className={"body7 text-red pl-[20px] pt-[5px]"}>
            {errorMessage}
          </Text>
        )}
      </div>
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
  icon: "none" | "search" | "delete" | "length";
  iconOnClick?: () => void;
  maxLength?: number;
  disabled?: boolean;
  value?: any;
}) {
  if (icon === "none") {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute right-[14px] top-[11px]",
        disabled ? "opacity-10" : "cursor-pointer",
      )}
      onClick={iconOnClick}
    >
      {icon === "search" && <IconSearch className={"h-[20px] w-[20px]"} />}
      {!!value && value.length > 0 && icon === "delete" && (
        <IconDelete className={"h-[20px] w-[20px]"} />
      )}
      {icon === "length" && (
        <Text className="body5 pt-[3px]">
          {`${!value?.length ? 0 : value?.length} `}
          <span className="text-gray-neutral">{`/ ${maxLength}`}</span>
        </Text>
      )}
    </div>
  );
}
