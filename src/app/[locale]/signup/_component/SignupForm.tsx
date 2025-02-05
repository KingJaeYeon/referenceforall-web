"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Text from "@/components/Layout/Text";
import React from "react";
import { Link } from "@/i18n/routing";

export default function SignupForm() {
  const signupSchema = z
    .object({
      email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
      password: z
        .string()
        .min(1, "비밀번호를 입력해주세요")
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
        .regex(/[a-z]/, "최소 1개의 소문자를 포함해야 합니다")
        .regex(/[A-Z]/, "최소 1개의 대문자를 포함해야 합니다")
        .regex(/[0-9]/, "최소 1개의 숫자를 포함해야 합니다"),
      confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다",
      path: ["confirmPassword"],
    });

  type SignupFormValues = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      console.log("회원가입 시도:", data);
      // 회원가입 로직 구현
    } catch (error) {
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {/* 이메일 필드 */}
        <div className="space-y-2">
          <Label htmlFor="email">
            이메일
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <Text className={"body7 pl-2 text-destructive"}>{errors.email.message}</Text>}
        </div>

        {/* 비밀번호 필드 */}
        <div className="space-y-2">
          <Label htmlFor="password">
            비밀번호
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <Text className={"body7 pl-2 text-destructive"}>{errors.password.message}</Text>}
        </div>

        {/* 비밀번호 확인 필드 */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            비밀번호 확인
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <Text className={"body7 pl-2 text-destructive"}>{errors.confirmPassword.message}</Text>
          )}
        </div>

        {/* 추가 필드들이 여기에 들어갈 수 있습니다 */}
      </div>

      <div className="space-y-4">
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "처리중..." : "회원가입"}
        </Button>

        <div className="text-center">
          <Link className="text-sm text-blue-600 hover:text-blue-800" href={"/login"}>
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </form>
  );
}
