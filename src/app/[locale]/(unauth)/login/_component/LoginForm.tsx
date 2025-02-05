"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/Layout/Text";
import GoogleLogin from "@/app/[locale]/(unauth)/login/_component/GoogleLogin";
import React from "react";

export default function LoginForm() {
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요")
      .email("올바른 이메일 형식이 아닙니다"),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요")
      .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log("로그인 시도:", data);
      // 로그인 로직 구현
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };



  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <Text className={"text-destructive body7 pl-2"}>{errors.email.message}</Text>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <Text className={"text-destructive body7 pl-2"}>{errors.password.message}</Text>
          )}
        </div>

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
      <GoogleLogin/>
    </React.Fragment>
  );
}
