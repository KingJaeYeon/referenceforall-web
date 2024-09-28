import React, { ComponentProps } from "react";

type TextProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
} & ComponentProps<"p">;

const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
};

Text.displayName = "Text";

export default Text;
