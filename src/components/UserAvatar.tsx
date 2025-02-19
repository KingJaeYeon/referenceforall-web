import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  className,
  src = "https://github.com/shadcn.png",
  alt = "shadcn",
  fbText = "CN",
}: {
  className?: string;
  src?: string;
  alt?: string;
  fbText?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fbText}</AvatarFallback>
    </Avatar>
  );
}
