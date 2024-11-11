import * as React from "react";

import { cn } from "@/lib/utils";
import { FontType, utilFont } from "@/util/fontType";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  font?: FontType;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, font, ...props }, ref) => {
    const customFont = utilFont(font, () => "body6");
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input-border bg-input px-3 py-2 text-base shadow-sm placeholder:text-input-placeholder hover:border-input-focus-border focus:border-input-focus-border focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          customFont,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
