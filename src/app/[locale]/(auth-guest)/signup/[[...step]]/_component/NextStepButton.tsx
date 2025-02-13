"use client";
import React, { useState } from "react";
import { useRouter } from "@/i18n/routing";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { InitFormDataKeys } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";
import { signup } from "@/service/user-service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface FormField {
  value: string;
  errorMessage: string;
}

type FormData = Record<InitFormDataKeys, FormField>;

interface NextStepButtonProps {
  currentStep: string;
  formData: FormData;
  setFormErrorAction: (key: InitFormDataKeys, value: string) => void;
  className?: string;
}

export default function NextStepButton({ currentStep, formData, setFormErrorAction, className }: NextStepButtonProps) {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (e) => {
      console.log(e);
      toast.error("네트워크 에러 발생");
    },
  });
  const [failedStep, setFailedStep] = useState(""); // 실패한 단계 저장

  const validateType = (
    type: string,
    setFormErrorAction: (key: InitFormDataKeys, value: string) => void,
    setFailedStep: any,
  ) => {
    const typeValid = ["username", "email"].includes(type);
    if (!typeValid) {
      setFormErrorAction("type", "회원가입 타입을 선택해주세요.");
      setFailedStep("type");
      return false;
    }
    setFormErrorAction("type", "");
    return true;
  };
  const validateUsername = () => {
    const input = getInputElement("username");
    const { value } = formData.username;

    const isEmpty = value === "";
    const inValidUsername = value.length < 4 && formData.type.value === "username";
    const inValidEmail = !(value.includes("@") && value.split("@")[1].length > 4) && formData.type.value === "email";

    if (isEmpty) {
      setFormErrorAction("username", "입력칸이 비어있습니다.");
      setFailedStep("username");
      input?.focus();
      return false;
    }
    if (inValidUsername) {
      setFormErrorAction("username", "유저이름은 4글자 이상 입력해주세요.");
      setFailedStep("username");
      input?.focus();
      return false;
    }
    if (inValidEmail) {
      setFormErrorAction("username", "이메일의 형식이 잘못되었습니다.");
      setFailedStep("username");
      input?.focus();
      return false;
    }
    setFormErrorAction("username", "");
    return true;
  };

  const validateVerify = () => {
    const input = getInputElement("verify");

    if (formData.type.value === "email" && !formData.verify.value) {
      setFormErrorAction("verify", "인증코드 입력칸이 비어있습니다.");
      setFailedStep("verify");
      input?.focus();
      return false;
    }
    setFormErrorAction("verify", "");
    return true;
  };

  const validatePassword = () => {
    const passwordInput = getInputElement("password");
    const confirmPwdInput = getInputElement("confirmPwd");

    const isMinLength = formData.password.value.length < 8;
    const isPwdMismatch = formData.password.value !== formData.confirmPwd.value;

    if (isMinLength) {
      setFormErrorAction("password", "비밀번호는 8글자 이상 입력해주세요.");
      passwordInput?.focus();
      return false;
    }
    if (isPwdMismatch) {
      setFormErrorAction("confirmPwd", "비밀번호가 일치하지 않습니다.");
      confirmPwdInput?.focus();
      return false;
    }
    setFormErrorAction("password", "");
    setFormErrorAction("confirmPwd", "");
    return true;
  };

  const validateStep = () => {
    switch (currentStep) {
      case "type":
        return validateType();
      case "username":
      case "email":
        return validateUsername();
      case "verify":
        return validateVerify();
      case "password":
        return validateType() && validateUsername() && validateVerify() && validatePassword();
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep === "password") {
      onSubmit();
    }

    if (currentStep === "email") {
      //.. 인증메일 보내기
    }

    if (currentStep === "verify") {
      //...인증메일 체크
    }

    const nextPaths: Record<string, string> = {
      type: `/signup/${formData.type.value}`,
      username: "/signup/password",
      email: "/signup/verify",
      verify: "/signup/password",
    };

    const nextPath = nextPaths[currentStep];
    if (!nextPath) return;

    // 처음 들어오면 초기화
    if (currentStep === "type") {
      const json = {
        type: formData.type.value,
        username: "",
        displayName: "",
        verify: "",
      };
      localStorage.setItem("signup", JSON.stringify(json));
    } else {
      const json = localStorage.getItem("signup");
      if (!json) {
        return router.replace("/signup");
      }
      localStorage.setItem(
        "signup",
        JSON.stringify({
          type: formData.type.value,
          username: formData.username.value,
          displayName: formData.displayName.value,
          verify: formData.verify.value,
        }),
      );
    }

    router.push(nextPath);
  };

  const rewriteToUrl = () => {
    router.push(`/signup/${failedStep}`);
  };

  const onSubmit = async () => {
    mutate({
      type: formData.type.value,
      username: formData.username.value,
      displayName: formData.displayName.value,
      verifyCode: formData.verify.value,
      password: formData.password.value,
    });
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        {currentStep === "password" && failedStep && (
          <button
            onClick={rewriteToUrl}
            className={"body6 my-[6px] h-[40px] rounded-[20px] px-6 font-light text-destructive"}
          >
            입력 오류 수정
          </button>
        )}
        <Button
          disabled={(!!failedStep && currentStep === "password") || isPending}
          onClick={handleNext}
          className={
            "my-[6px] h-[40px] rounded-[20px] bg-[#0b57d0] px-6 font-light text-white hover:bg-[#0847a8] hover:text-white"
          }
        >
          {currentStep === "password" && "가입하기"}
          {currentStep === "email" && "인증메일 보내기"}
          {!["password", "email"].includes(currentStep) && "다음"}
        </Button>
      </Row>
    </Row>
  );
}
