import {
  InitFormDataKeys,
  InitFormDataType,
} from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";
import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Col from "@/components/Layout/Col";
import {
  StepPwd,
  StepSelectedType,
  StepUserName,
} from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepContents";

interface ISignUpSteps {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
  step?: string;
}

export default function SignUpSteps({ formData, onChangeHandler, step }: ISignUpSteps) {
  let label, content;

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
    <Col className={"md:flex-row"}>
      <CardHeader className="flex-1 items-start space-y-3 p-6 pl-0">
        <CardTitle className="heading1 text-[1.8rem]">{label.title}</CardTitle>
        <CardDescription font={"body3"}>{label.description}</CardDescription>
      </CardHeader>
      {content}
    </Col>
  );
}
