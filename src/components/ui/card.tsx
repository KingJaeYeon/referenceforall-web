import * as React from "react";

import { cn } from "@/lib/utils";
import { FontType, utilFont } from "@/util/fontType";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  onlyMobile?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, onlyMobile, ...props }, ref) => {
  let style = onlyMobile
    ? "md:rounded-xl md:border md:bg-card md:text-card-foreground md:shadow"
    : "rounded-xl border bg-card text-card-foreground shadow";
  return <div ref={ref} className={cn(style, className)} {...props} />;
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  font?: FontType;
}

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(({ className, font, ...props }, ref) => {
  const customFont = utilFont(font, () => {
    return "body5";
  });
  return <div ref={ref} className={cn("text-muted-foreground", customFont, className)} {...props} />;
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
