import React, { ComponentProps } from "react";

type TextProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
} & ComponentProps<"p">;

export const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
};

Text.displayName = "Text";
