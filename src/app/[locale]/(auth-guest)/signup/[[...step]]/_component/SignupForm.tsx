"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Col from "@/components/Layout/Col";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioButton } from "@/components/RadioButton";
import { Label } from "@/components/ui/label";
import { AlertTip } from "@/components/AlertTip";
import NextStepButton from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextStepButton";
import { Input } from "@/components/ui/input";

type FormField = { value: string; isError: boolean };

type InitFormDataType = Record<"type" | "username" | "displayName" | "verify" | "password" | "confirmPwd", FormField>;

export type InitFormDataKeys = keyof InitFormDataType;

export default function SignupForm({ step = "type" }: { step?: string }) {
  const searchParams = useSearchParams();
  let content, label;

  const [formData, setFormData] = useState<InitFormDataType>({
    type: { value: searchParams.get("type") || "", isError: false },
    username: { value: searchParams.get("username") || "", isError: false },
    displayName: { value: searchParams.get("displayName") || "", isError: false },
    verify: { value: searchParams.get("verify") || "", isError: false },
    password: { value: searchParams.get("password") || "", isError: false },
    confirmPwd: { value: searchParams.get("confirmPwd") || "", isError: false },
  });

  const onChangeHandler = (key: InitFormDataKeys, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], value } }));
  };

  const onErrorHandler = (key: InitFormDataKeys, value: boolean) => {
    setFormData((prev) => ({ ...prev, [key]: { ...prev[key], isError: value } }));
  };

  switch (step) {
    case "username":
      label = { title: "유저이름 입력", description: "4글자 이상으로 입력해주세요." };
      content = <StepUserName />;
      break;

    default:
      label = { title: "모두의 레퍼런스 계정 만들기", description: "이메일이나 유저이름을 선택해주세요." };
      content = <StepSelectedType formData={formData} onChangeHandler={onChangeHandler} />;
  }

  return (
    <React.Fragment>
      <Col className={"md:flex-row"}>
        <CardHeader className="flex-1 items-start space-y-3 p-6 pl-0">
          <CardTitle className="heading1 text-[1.8rem]">{label.title}</CardTitle>
          <CardDescription font={"body3"}>{label.description}</CardDescription>
        </CardHeader>
        {content}
      </Col>
      <NextStepButton currentStep={step} formData={formData} setFormErrorAction={onErrorHandler} />
    </React.Fragment>
  );
}

function StepSelectedType({
  formData,
  onChangeHandler,
}: {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
}) {
  return (
    <CardContent className={"animate-slide-in flex-1 px-0 py-6"}>
      <RadioButton
        value={"username"}
        selected={formData.type.value}
        onChange={(value) => onChangeHandler("type", value)}
        className={"gap-4 border-b border-[#c4c7c5] py-4"}
        isError={formData.type.isError}
      >
        <Label
          htmlFor="email"
          font={"body4"}
          onClick={() => onChangeHandler("type", "username")}
          className={"cursor-pointer"}
        >
          유저이름
        </Label>
      </RadioButton>
      <RadioButton
        value={"email"}
        selected={formData.type.value}
        onChange={(value) => onChangeHandler("type", value)}
        className={"gap-4 border-b border-[#c4c7c5] py-4"}
        isError={formData.type.isError}
      >
        <Label
          htmlFor="email"
          font={"body4"}
          onClick={() => onChangeHandler("type", "email")}
          className={"cursor-pointer"}
        >
          이메일
        </Label>
      </RadioButton>
      {formData.type.isError && <AlertTip label={"회원가입 타입을 선택해주세요."} />}
    </CardContent>
  );
}

function StepUserName() {
  return (
    <CardContent className={"animate-slide-in flex-1 px-0 py-6"}>
      <Col>
        <input className={'h-[52px]'}/>
        <p>비밀번호</p>
      </Col>
      <Col className={"pt-6"}>
        <Input className={'h-[52px]'}/>
        <p>확인</p>
      </Col>
    </CardContent>
  );
}

function StepEmail() {
  return;
}

function StepVerifyEmail() {
  return;
}

function StepPwd() {
  return;
}
