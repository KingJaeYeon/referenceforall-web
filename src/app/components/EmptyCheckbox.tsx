import React, { useRef } from "react";
import Row from "@/components/Layout/Row";
import { cn } from "@/lib/utils";

interface IEmptyCheckbox {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  id?: string;
}

export function EmptyCheckbox({ isChecked, setIsChecked, id }: IEmptyCheckbox) {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <Row className={"relative h-6 w-6 items-center justify-center"}>
      <div className={"absolute top-[-12px] m-1 p-[11px]"}>
        <div className={"relative h-[18px] w-[18px]"}>
          <input
            id={id}
            type={"checkbox"}
            hidden
            ref={ref}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.currentTarget.checked)}
          />
          <Row
            onClick={() => ref.current?.click()}
            className={cn(
              "absolute h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-[2px] border-2 border-[currentColor]",
              isChecked ? "border-[#0b57d0] bg-[#0b57d0]" : "border-[#444746] bg-transparent",
            )}
            style={{
              transition:
                "background-color 90ms 0ms cubic-bezier(.4,0,.6,1),border-color 90ms 0ms cubic-bezier(.4,0,.6,1)",
            }}
          >
            <Indicator isChecked={isChecked} className={cn("text-[#fff] transition-all")} />
          </Row>
        </div>
      </div>
    </Row>
  );
}

function Indicator({ className, isChecked }: { className?: string; isChecked: boolean }) {
  const stokeDashoffset = 29.7833385;
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        style={{
          transition: "stroke-dashoffset .18s 0ms cubic-bezier(.4,0,.6,1)",
          strokeDashoffset: isChecked ? 0 : stokeDashoffset,
        }}
        strokeWidth={3.12}
        strokeDasharray={isChecked ? stokeDashoffset : 0}
        stroke="currentColor"
        className={className}
        fill="none"
        d="M1.73,12.91 8.1,19.28 22.79,4.59"
      ></path>
    </svg>
  );
}
