"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import NextStepButton from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextStepButton";
import SignUpSteps from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignUpSteps";

type FormField = { value: string; errorMessage: string };

export type InitFormDataType = Record<
  "type" | "username" | "displayName" | "verify" | "password" | "confirmPwd",
  FormField
>;

export type InitFormDataKeys = keyof InitFormDataType;

export default function SignupForm({ step = "type" }: { step?: string }) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<InitFormDataType>({
    type: { value: searchParams.get("type") || "", errorMessage: "" },
    username: { value: searchParams.get("username") || "", errorMessage: "" },
    displayName: { value: searchParams.get("displayName") || "", errorMessage: "" },
    verify: { value: searchParams.get("verify") || "", errorMessage: "" },
    password: { value: searchParams.get("password") || "", errorMessage: "" },
    confirmPwd: { value: searchParams.get("confirmPwd") || "", errorMessage: "" },
  });

  const onChangeHandler = (key: InitFormDataKeys, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], value } }));
  };

  const onErrorHandler = (key: InitFormDataKeys, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], errorMessage: value } }));
  };

  return (
    <React.Fragment>
      <SignUpSteps step={step} formData={formData} onChangeHandler={onChangeHandler} />
      <NextStepButton currentStep={step} formData={formData} setFormErrorAction={onErrorHandler} />
    </React.Fragment>
  );
}
