import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Col from "@/components/Layout/Col";
import {
  StepEmail,
  StepPwd,
  StepSelectedType,
  StepUserName,
  StepVerifyEmail,
} from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepContents";
import { StepSelectedTypeBtn } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepSelectedTypeBtn";
import { StepUserNameBtn } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepUserNameBtn";
import { StepPwdBtn } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepPwdBtn";
import { StepVerifyEmailBtn } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/StepVerifyEmailBtn";

export default function SignUpSteps({ step }: { step?: string }) {
  let label, content, button;

  switch (step) {
    case "username":
      label = { title: "유저이름 입력", description: "4글자 이상으로 입력해주세요." };
      content = <StepUserName />;
      button = <StepUserNameBtn />;
      break;
    case "email":
      label = { title: "이메일 입력", description: "사용하실 이메일을 입력해주세요." };
      content = <StepEmail />;
      button = <StepUserNameBtn />;
      break;
    case "verify":
      label = { title: "코드 입력", description: "본인 확인을 위한 인증코드가 발송되었습니다." };
      content = <StepVerifyEmail />;
      button = <StepVerifyEmailBtn />;
      break;
    case "password":
      label = { title: "안전한 비밀번호 만들기", description: "8글자 이상으로 비밀번호를 만드세요." };
      content = <StepPwd />;
      button = <StepPwdBtn />;
      break;
    default:
      label = { title: "모두의 레퍼런스 계정 만들기", description: "이메일이나 유저이름을 선택해주세요." };
      content = <StepSelectedType />;
      button = <StepSelectedTypeBtn />;
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
      {button}
    </React.Fragment>
  );
}
