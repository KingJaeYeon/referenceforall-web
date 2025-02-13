import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function NextButton({ isLoading, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      disabled={isLoading}
      className={
        "my-[6px] h-[40px] rounded-[20px] bg-[#0b57d0] px-6 font-light text-white hover:bg-[#0847a8] hover:text-white"
      }
    >
      {isLoading ? <Loader2 /> : "다음"}
    </Button>
  );
}
