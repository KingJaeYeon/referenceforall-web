import {
  InitFormDataKeys,
  InitFormDataType,
} from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";
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
import useSignupStore from "@/store/useSignupStore";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { validUsername } from "@/service/auth-service";
import { getInputElement } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import { useRouter } from "@/i18n/routing";
import Row from "@/components/Layout/Row";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import { signup } from "@/service/user-service";
import { toast } from "sonner";

interface ISignUpSteps {
  step?: string;
}

function StepPwdBtn() {
  const { formData, onErrorHandler } = useSignupStore();
  const t = useTranslations();
  const passwordInput = getInputElement("password");
  const confirmPwdInput = getInputElement("confirmPwd");

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      onErrorHandler("username", "");
      toast.success('회원가입 되었습니다.')
      localStorage.removeItem("signup");
      router.push("/login");
    },
    onError: (e) => {
      onErrorHandler("password", t(e.message));
      passwordInput?.focus();
    },
  });

  const router = useRouter();

  const validate = async () => {
    const isMinLength = formData.password.value.length < 8;
    const isPwdMismatch = formData.password.value !== formData.confirmPwd.value;

    if (isMinLength) {
      onErrorHandler("password", "비밀번호는 8글자 이상 입력해주세요.");
      passwordInput?.focus();
      return false;
    }
    if (isPwdMismatch) {
      onErrorHandler("confirmPwd", "비밀번호가 일치하지 않습니다.");
      confirmPwdInput?.focus();
      return false;
    }
    onErrorHandler("password", "");
    onErrorHandler("confirmPwd", "");
    return true;
  };

  const onClickHandler = async () => {
    const isValid = await validate();
    if (!isValid) return;

    mutate({
      username: formData.username.value,
      password: formData.password.value,
      displayName: formData.displayName.value,
      verifyCode: formData.verify.value,
      type: formData.type.value,
    });
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton onClick={onClickHandler} disabled={isPending} />
      </Row>
    </Row>
  );
}

export default function SignUpSteps({ step }: ISignUpSteps) {
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
