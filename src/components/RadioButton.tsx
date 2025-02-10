import Row from "@/components/Layout/Row";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RadioButtonProps {
  value: string;
  selected?: string;
  onChange: any;
  children: ReactNode;
  className?: string;
}

export function RadioButton({ value, selected, onChange, className, children }: RadioButtonProps) {
  return (
    <Row className={cn("items-center", className)}>
      <Row className={"relative z-[1] min-h-6 w-6 items-center justify-center"}>
        <div
          onClick={() => onChange(value)}
          className={cn(
            "relative h-[20px] w-[20px] cursor-pointer rounded-full border-2",
            value === selected ? "border-[#0b57d0]" : "border-[#747775]",
          )}
        >
          <Indicator value={value} selected={selected} />
        </div>
      </Row>
      {children}
    </Row>
  );
}

function Indicator({ value, selected }: Pick<RadioButtonProps, "value" | "selected">) {
  const isSelected = value === selected;

  return (
    <div className={"absolute left-0 top-0 h-4 w-4"}>
      <div
        className={"absolute left-1/2 top-1/2 rounded-full border-[5px] border-[#0b57d0]"}
        style={{
          transform: isSelected
            ? "translateX(-50%) translateY(-50%) scale(1)"
            : "translateX(-50%) translateY(-50%) scale(0)",
          transition: "transform 0.28s ease",
        }}
      ></div>
    </div>
  );
}
