"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/layout";
import GoogleLogin from "@/app/[locale]/(auth-guest)/login/_component/GoogleLogin";
import React from "react";
import { login } from "@/service/auth.service";
import { useTranslation } from "@/app/i18n/client";

interface IError {
  username?: string;
  password?: string;
}

export default function LoginForm() {
  const { t } = useTranslation();
  const loginSchema = z.object({
    username: z
      .string()
      .min(1, t("enter_username"))
      .min(4, t("username_min_length", { cnt: 4 })),
    password: z
      .string()
      .min(1, t("enter_password"))
      .min(8, t("password_min_length", { cnt: 8 })),
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
    setErrors(() => ({ password: password, username: username }));
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit, onErrors)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">{t("username")}</Label>
          <Input
            id="username"
            type="text"
            placeholder={t("username")}
            {...register("username")}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && <Text className={"body7 pl-2 text-destructive"}>{errors.username}</Text>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <Text className={"body7 pl-2 text-destructive"}>{errors.password}</Text>}
        </div>

        <Button type="submit" className="w-full">
          {t("login")}
        </Button>
      </form>
      <GoogleLogin />
    </React.Fragment>
  );
}
