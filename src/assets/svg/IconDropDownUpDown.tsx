import { cn } from "@/lib/utils";

export function IconDropDownDown({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" />
    </svg>
  );
}

export function IconDropDownUp({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
    >
      <path d="M9 5L5 1L1 5" stroke="currentColor" />
    </svg>
  );
}
