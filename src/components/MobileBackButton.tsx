"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function MobileBackButton({
  className,
}: {
  className?: string;
}) {
  const { back } = useRouter();
  return (
    <button onClick={() => back()} className={className}>
      <ArrowLeft />
    </button>
  );
}
