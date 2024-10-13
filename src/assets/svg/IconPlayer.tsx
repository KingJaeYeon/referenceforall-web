import { cn } from "@/lib/utils";

export function IconLinearPlayer({ className }: { className?: string }) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.67 1.5C4.71012 1.5 1.5 4.71012 1.5 8.67C1.5 12.6299 4.71012 15.84 8.67 15.84C12.6299 15.84 15.84 12.6299 15.84 8.67C15.84 4.71012 12.6299 1.5 8.67 1.5ZM0.5 8.67C0.5 4.15783 4.15783 0.5 8.67 0.5C13.1822 0.5 16.84 4.15783 16.84 8.67C16.84 13.1822 13.1822 16.84 8.67 16.84C4.15783 16.84 0.5 13.1822 0.5 8.67ZM6.90007 5.16116C7.06265 5.07415 7.25992 5.08369 7.41335 5.18598L12.0154 8.25397C12.1544 8.34671 12.238 8.50282 12.238 8.67C12.238 8.83718 12.1544 8.99329 12.0154 9.08603L7.41335 12.154C7.25992 12.2563 7.06265 12.2658 6.90007 12.1788C6.73749 12.0918 6.636 11.9224 6.636 11.738V5.602C6.636 5.4176 6.73749 5.24817 6.90007 5.16116ZM7.636 6.53626V10.8037L10.8366 8.67L7.636 6.53626Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSolidPlayer({ className }: { className?: string }) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 8.67C0.5 4.15783 4.15783 0.5 8.67 0.5C13.1822 0.5 16.84 4.15783 16.84 8.67C16.84 13.1822 13.1822 16.84 8.67 16.84C4.15783 16.84 0.5 13.1822 0.5 8.67ZM6.9003 5.16115C7.06288 5.07414 7.26015 5.08368 7.41358 5.18597L12.0156 8.25397C12.1547 8.3467 12.2382 8.50281 12.2382 8.66999C12.2382 8.83717 12.1547 8.99328 12.0156 9.08602L7.41358 12.154C7.26015 12.2563 7.06288 12.2658 6.9003 12.1788C6.73772 12.0918 6.63623 11.9224 6.63623 11.738V5.60199C6.63623 5.41759 6.73772 5.24816 6.9003 5.16115Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconPlayerExpand({ className }: { className?: string }) {
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
        d="M10.5 3H15V15H3V10.5M10 10L3 3M3 3L3 8M3 3L8 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPlayerForward({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M11 9L2 15L2 3L11 9Z" fill="currentColor" />
      <path d="M15 15H12L12 3L15 3L15 15Z" fill="currentColor" />
    </svg>
  );
}

export function IconPlayerPause({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M3 2H7V16H3V2Z" fill="currentColor" />
      <path d="M11 2H15V16H11V2Z" fill="currentColor" />
    </svg>
  );
}

export function IconPlayerRewind({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className, "text-icon")}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path d="M7 9L16 3V15L7 9Z" fill="currentColor" />
      <path d="M3 3H6V15H3V3Z" fill="currentColor" />
    </svg>
  );
}
