"use client";
import React from "react";
import SignUpSteps from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignUpSteps";

type FormField = { value: string; errorMessage: string };

export type InitFormDataType = Record<
  "type" | "username" | "displayName" | "verify" | "password" | "confirmPwd",
  FormField
>;

export type InitFormDataKeys = keyof InitFormDataType;

export default function SignupForm({ step = "type" }: { step?: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <SignUpSteps step={step} />
    </form>
  );
}
