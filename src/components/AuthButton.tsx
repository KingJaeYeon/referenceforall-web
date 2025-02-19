"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { logout } from "@/service/auth-service";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";

export default function AuthButton({ isLogin }: { isLogin: boolean }) {
  return isLogin ? <AvatarButton /> : <LoginButton />;
}

function LoginButton() {
  return (
    <Link className={"heading6"} href={"/login"}>
      로그인
    </Link>
  );
}

function AvatarButton() {
  const { user } = useUserStore();
  const { push } = useRouter();
  const onClickHandler = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger onClick={() => push("/my/setting")}>
        <UserAvatar className={"h-8 w-8 cursor-pointer"} alt={user.icon} src={user.icon} fbText={user.displayName} />
      </HoverCardTrigger>
      <HoverCardContent className={"flex max-w-[200px] flex-col items-start gap-[2px]"} align={"end"}>
        <button
          className={"w-full rounded-[3px] px-2 py-0.5 text-left hover:bg-gray-100"}
          onClick={() => push(`/@${user.displayName}`)}
        >
          프로필
        </button>
        <button className={"w-full rounded-[3px] px-2 py-0.5 text-left hover:bg-gray-100"}>내 리스트</button>
        <button className={"w-full rounded-[3px] px-2 py-0.5 text-left hover:bg-gray-100"}>세팅</button>
        <div className={"my-1 h-[2px] w-full bg-gray-300"} />
        <button className={"w-full rounded-[3px] px-2 py-0.5 text-left hover:bg-gray-50"} onClick={onClickHandler}>
          로그아웃
        </button>
      </HoverCardContent>
    </HoverCard>
  );
}
