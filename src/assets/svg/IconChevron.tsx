import { cn } from "@/lib/utils";

export function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M12.72 15.95L5.5 8.72L12.72 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M5.5 1.5L12.72 8.72L5.5 15.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
