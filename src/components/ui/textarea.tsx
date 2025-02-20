import * as React from "react";

import { cn } from "@/lib/utils";
import { Text } from "@/components/layout";
import { FontType, utilFont } from "@/util/fontType";
import { cva, VariantProps } from "class-variance-authority";

export const textareaVariants = cva(
  [
    "body4 placeholder:body4 flex min-h-[100px] w-full max-w-full resize-none bg-input px-3 py-2 focus-visible:outline-none disabled:pointer-events-none disabled:border-input-disabled-border disabled:text-input-disabled-foreground disabled:placeholder:opacity-20",
  ],
  {
    variants: {
      variant: {
        default:
          "border border-input-border rounded-sm hover:border-input-focus-border focus:border-input-focus-border placeholder:text-input-placeholder",
        blockquote:
          "rounded-none placeholder:leading-7 py-1 relative max-w-[40rem] mx-auto leading-7 bg-transparent border-l-4 border-r-none border-input-focus-border",
      },
      error: {
        true: "border-red hover:border-red focus:border-red",
      },
      hasMaxLength: {
        true: "pr-[70px]",
      },
    },
    defaultVariants: {
      variant: "default",
      error: false,
      hasMaxLength: false,
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  errorMessage?: string;
  font?: FontType;
  showMaxLength?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className, //
      errorMessage,
      disabled = false,
      value,
      maxLength = 250,
      readOnly = false,
      showMaxLength,
      font,
      variant,
      ...props
    },
    ref,
  ) => {
    const customFont = utilFont(font, () => "body5 placeholder:body5");
    return (
      <div className={cn("relative w-full max-w-full", disabled && "cursor-not-allowed")}>
        <textarea
          className={cn(
            textareaVariants({
              variant,
              error: !!errorMessage,
              hasMaxLength: showMaxLength,
            }),
            customFont,
            className,
          )}
          ref={ref}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {!readOnly && showMaxLength && (
          <div
            className={cn(
              "absolute bottom-[8px] right-[16px]",
              disabled && "opacity-10",
              errorMessage && "bottom-[35px]",
            )}
          >
            <Text className="body5 pt-[3px] text-gray-500">
              {`${!value ? 0 : value.toString().length} `}
              <span className="text-gray-neutral">{`/ ${maxLength}`}</span>
            </Text>
          </div>
        )}
        {errorMessage && <Text className={"body7 pl-[20px] pt-[5px] text-red"}>{errorMessage}</Text>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
