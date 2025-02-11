"use client";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
import Col from "@/components/Layout/Col";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioButton } from "@/components/RadioButton";
import { Label } from "@/components/ui/label";
import { AlertTip } from "@/components/AlertTip";
import NextStepButton from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextStepButton";
import { FloatingOutlinedInput } from "@/app/components/FloatingOutlinedInput";
import Row from "@/components/Layout/Row";

type FormField = { value: string; errorMessage: string };

type InitFormDataType = Record<"type" | "username" | "displayName" | "verify" | "password" | "confirmPwd", FormField>;

export type InitFormDataKeys = keyof InitFormDataType;

export default function SignupForm({ step = "type" }: { step?: string }) {
  const searchParams = useSearchParams();
  let content, label;

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

  switch (step) {
    case "username":
      label = { title: "유저이름 입력", description: "4글자 이상으로 입력해주세요." };
      content = <StepUserName formData={formData} onChangeHandler={onChangeHandler} />;
      break;
    case "password":
      label = { title: "안전한 비밀번호 만들기", description: "8글자 이상으로 비밀번호를 만드세요." };
      content = <StepPwd formData={formData} onChangeHandler={onChangeHandler} />;
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
        isError={!!formData.type.errorMessage}
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
        isError={!!formData.type.errorMessage}
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
      {formData.type.errorMessage && <AlertTip label={formData.type.errorMessage} />}
    </CardContent>
  );
}

function StepUserName({
  formData,
  onChangeHandler,
}: {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
}) {
  return (
    <CardContent className={"animate-slide-in flex-1 px-0 py-6"}>
      <FloatingOutlinedInput
        id={"displayName"}
        label={"닉네임(선택사항)"}
        value={formData.displayName.value}
        onChangeValue={(value: string) => onChangeHandler("displayName", value)}
      />
      <FloatingOutlinedInput
        id={"username"}
        label={"유저이름"}
        className={"mt-6"}
        value={formData.username.value}
        onChangeValue={(value: string) => onChangeHandler("username", value)}
        isError={!!formData.username.errorMessage}
      />
      {formData.username.errorMessage && <AlertTip label={formData.username.errorMessage} />}
    </CardContent>
  );
}

function StepEmail() {
  return;
}

function StepVerifyEmail() {
  return;
}

function StepPwd({
  formData,
  onChangeHandler,
}: {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
}) {
  const [inputType, setInputType] = useState("password");
  return (
    <CardContent className={"animate-slide-in flex-1 px-0 py-6"}>
      <FloatingOutlinedInput
        id={"password"}
        label={"비밀번호"}
        type={inputType}
        value={formData.password.value}
        onChangeValue={(value: string) => onChangeHandler("password", value)}
      />
      <FloatingOutlinedInput
        id={"confirmPwd"}
        label={"확인"}
        className={"mt-6"}
        type={inputType}
        value={formData.confirmPwd.value}
        onChangeValue={(value: string) => onChangeHandler("confirmPwd", value)}
        isError={!!formData.confirmPwd.errorMessage}
      />
      {formData.username.errorMessage && <AlertTip label={formData.username.errorMessage} />}
      <Row className={"items-center pt-2"}>
        <EmptyCheckbox
          checked={inputType === "text"}
          onCheckedChange={(checked) => setInputType(checked ? "text" : "password")}
        />
        <Label className={"ml-4 cursor-pointer"}>비밀번호 표시</Label>
      </Row>
    </CardContent>
  );
}

function EmptyCheckbox() {
  return (
    <Row className={"relative h-6 w-6 items-center justify-center"}>
      <div className={"absolute top-[-12px] p-[11px]"}>
        <div className={"relative m-1 h-[18px] w-[18px] cursor-pointer rounded-[2px] border-2 border-[#444746]"} />
      </div>
    </Row>
  );
}
