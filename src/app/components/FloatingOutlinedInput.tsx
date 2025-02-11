import React, { useState } from "react";
import Col from "@/components/Layout/Col";
import { cn } from "@/lib/utils";
import Row from "@/components/Layout/Row";

interface IFloatingOutlinedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  onChangeValue: (value: string) => void;
  isError?: boolean;
}

export function FloatingOutlinedInput(props: IFloatingOutlinedInputProps) {
  const { label, className, onChangeValue, isError,...rest} = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Col className={cn("relative h-[56px] justify-center", className)}>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.target.value) setIsFocused(false);
        }}
        onChange={(e) => onChangeValue(e.target.value)}
        className={"body3 m-[2px] flex h-[28px] flex-1 border-none px-[14px] py-[12px] focus-visible:outline-none"}
        {...rest}
      />
      <p
        className={cn(
          "body3 absolute left-2 bg-white px-2",
          isFocused ? "left-1 translate-y-[-110%] scale-[0.8] text-[#0b57b0]" : "",
          isError && "text-[#b3261e]",
        )}
        style={{ transition: "all .3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        {label}
      </p>
      <Row
        className={cn(
          "absolute z-[-1] h-full w-full rounded-[4px] border border-[#1f1f1f]",
          isError && "border-[#b3261e]",
        )}
      />
      <Row
        className={cn(
          "absolute z-[-1] h-full w-full rounded-[4px] border-[3px] border-[#0b57b0]",
          isError && "border-[#b3261e]",
        )}
        style={{
          transition: "opacity .3s cubic-bezier(0.4,0,0.2,1)",
          opacity: isFocused ? "1" : "0",
        }}
      />
    </Col>
  );
}
