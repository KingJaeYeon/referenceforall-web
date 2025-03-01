import React from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Col } from "@/components/layout";
import {
  StepEmail,
  StepPwd,
  StepSelectedType,
  StepUserName,
  StepVerifyEmail,
} from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/StepContents";
import { StepSelectedTypeBtn } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/StepSelectedTypeBtn";
import { StepUserNameBtn } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/StepUserNameBtn";
import { StepPwdBtn } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/StepPwdBtn";
import { StepVerifyEmailBtn } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/StepVerifyEmailBtn";
import { useTranslation } from "@/app/i18n/client";

export default function SignUpSteps({ step }: { step?: string }) {
  let label, content, button;
  const { t } = useTranslation();
  switch (step) {
    case "username":
      label = { title: t("signup_username_title"), description: t("signup_username_desc") };
      content = <StepUserName />;
      button = <StepUserNameBtn />;
      break;
    case "email":
      label = { title: t("signup_email_title"), description: t("signup_email_desc") };
      content = <StepEmail />;
      button = <StepUserNameBtn />;
      break;
    case "verify":
      label = { title: t("signup_code_title"), description: t("signup_code_desc") };
      content = <StepVerifyEmail />;
      button = <StepVerifyEmailBtn />;
      break;
    case "password":
      label = { title: t("signup_password_title"), description: t("signup_password_desc", { cnt: 8 }) };
      content = <StepPwd />;
      button = <StepPwdBtn />;
      break;
    default:
      label = { title: t("signup_type_title"), description: t("signup_type_desc") };
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
