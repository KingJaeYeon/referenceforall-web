import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label?: string;
}

export function NextButton({ isLoading, label, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      disabled={isLoading}
      className={
        "my-[6px] h-[40px] rounded-[20px] bg-[#0b57d0] px-6 font-light text-white hover:bg-[#0847a8] hover:text-white"
      }
    >
      {isLoading ? <Loader2 className={'animate-spin w-3.5 h-3.5'}/> : label}
    </Button>
  );
}
