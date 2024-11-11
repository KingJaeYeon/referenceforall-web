import * as React from "react";
import Text from "@/components/Layout/Text";
import { cn } from "@/lib/utils";
import { IconSearch } from "@/assets/svg/IconSearch";
import { IconDelete } from "@/assets/svg/IconDelete";
import { FontType, utilFont } from "@/util/fontType";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "none" | "search" | "delete" | "length";
  iconOnClick?: () => void;
  errorMessage?: string;
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
      icon = "none",
      iconOnClick,
      maxLength = 30,
      disabled = false,
      value,
      errorMessage,
      font,
      inputClassName,
      ...props
    },
    ref,
  ) => {
    const customFont = utilFont(font, () => "body6 placeholder:body6");
    return (
      <div
        className={cn(
          "relative h-[42px] w-full",
          className,
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          type={type}
          className={cn(
            "placeholder:body4 flex h-full w-full rounded-[6px] border border-input-border bg-input px-[20px] py-2 placeholder:text-input-placeholder hover:border-input-focus-border focus:border-input-focus-border focus-visible:outline-none disabled:pointer-events-none disabled:border-input-disabled-border disabled:text-input-disabled-foreground disabled:placeholder:opacity-20",
            icon !== "none" ? "pr-[40px]" : "",
            errorMessage && "border-red hover:border-red focus:border-red",
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
        <InputIcon
          icon={icon}
          iconOnClick={iconOnClick}
          maxLength={maxLength}
          disabled={disabled}
          value={value}
        />
        {errorMessage && (
          <Text className={"body7 pl-[20px] pt-[5px] text-red"}>
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
