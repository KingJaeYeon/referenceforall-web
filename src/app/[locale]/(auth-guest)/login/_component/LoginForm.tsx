"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/Layout/Text";
import GoogleLogin from "@/app/[locale]/(auth-guest)/login/_component/GoogleLogin";
import React from "react";
import { login } from "@/service/auth-service";
import { useTranslations } from "next-intl";

interface IError {
  username?: string;
  password?: string;
}

export default function LoginForm() {
  const t = useTranslations();
  const loginSchema = z.object({
    username: z.string().min(1, "유저이름을 입력해주세요").min(1, "유저이름을 입력해주세요"),
    password: z.string().min(1, "비밀번호를 입력해주세요").min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [errors, setErrors] = React.useState<IError>({});

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      window.location.href = "/";
    } catch (error: any) {
      const { message, code } = error;
      if (code === "AUTH-002") {
        setErrors((prev) => ({ ...prev, password: t(message) }));
      }
    }
  };

  const onErrors = (errors: any) => {
    const username = errors.username?.message;
    const password = errors.password?.message;
    if (username) {
      setErrors((prev) => ({ ...prev, username }));
    }
    if (password) {
      setErrors((prev) => ({ ...prev, password }));
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">유저이름</Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            {...register("username")}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && <Text className={"body7 pl-2 text-destructive"}>{errors.username}</Text>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <Text className={"body7 pl-2 text-destructive"}>{errors.password}</Text>}
        </div>

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
      <GoogleLogin />
    </React.Fragment>
  );
}
