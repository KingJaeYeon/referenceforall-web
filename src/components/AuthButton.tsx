"use client";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/auth-service";

export default function AuthButton({ isLogin }: { isLogin: boolean }) {
  return isLogin ? <LogoutButton /> : <LoginButton />;
}

function LoginButton() {
  return (
    <Link className={"heading6"} href={"/login"}>
      로그인
    </Link>
  );
}

function LogoutButton() {
  const onClickHandler = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  }

  return <Button variant={'default'} onClick={onClickHandler}>로그아웃</Button>;
}
