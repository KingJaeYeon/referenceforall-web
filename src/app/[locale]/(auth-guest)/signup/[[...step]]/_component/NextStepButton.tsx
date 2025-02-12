"use client";
import React, { useState } from "react";
import { useRouter } from "@/i18n/routing";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { InitFormDataKeys } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";

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
  const searchParams = useSearchParams();
  const [failedStep, setFailedStep] = useState(""); // 실패한 단계 저장

  // const typeSchema = z.enum(["username", "email"], { message: "잘못된 회원가입 타입입니다." });
  // const usernameSchema = z
  //   .object({
  //     username: z.string().min(1, "필수입력칸이 비어있습니다."),
  //     displayName: z.string().optional(),
  //   })
  //   .refine((data) => !(formData.type.value === "username" && data.username.length < 4), {
  //     message: "유저이름은 4글자 이상 입력해주세요.",
  //     path: ["username"],
  //   })
  //   .refine((data) => !(formData.type.value === "email" && !data.username.includes("@")), {
  //     message: "이메일의 형식이 잘못되었습니다.",
  //     path: ["username"],
  //   });
  // const verifySchema = z.string().min(1, "인증번호를 입력해주세요.");
  // const passwordSchema = z
  //   .object({
  //     password: z.string().min(1, "비밀번호를 입력해주세요.").min(8, "비밀번호는 8글자 이상 입력해주세요."),
  //     confirmPwd: z.string().min(1, "입력칸이 비어있습니다."),
  //   })
  //   .refine((data) => data.password === data.confirmPwd, {
  //     message: "비밀번호가 일치하지 않습니다.",
  //     path: ["confirmPwd"],
  //   });

  const validateStep = () => {
    const { password, confirmPwd, username, type, verify, displayName } = formData;

    if (currentStep === "type" || currentStep === "password") {
      const typeValid = ["username", "email"].includes(type.value); // 실제 검증 로직으로 변경
      if (!typeValid) {
        setFormErrorAction("type", "회원가입 타입을 선택해주세요.");
        setFailedStep("type");
        return false;
      }
      setFormErrorAction("type", "");
    }

    // username 검증
    if (currentStep === "username" || currentStep === "password") {
      const usernameValid = validateUsername(username.value, type.value); // 실제 검증 로직으로 변경
      if (!usernameValid.success) {
        setFormErrorAction("username", usernameValid.message);
        setFailedStep("username");
        return false;
      }
      setFormErrorAction("username", "");
    }

    // verify 검증
    if ((currentStep === "verify" && formData.type.value === "email") || currentStep === "password") {
      const verifyValid = verify.value.length < 1; // 실제 검증 로직으로 변경
      if (!verifyValid) {
        setFormErrorAction("verify", "입력칸이 비어있습니다.");
        setFailedStep("verify");
        return false;
      }
      setFormErrorAction("verify", "");
    }

    if (currentStep === "password") {
      const passwordInput = document.getElementById("password");
      const confirmPwdInput = document.getElementById("confirmPwd");

      const pwdValid = validatePwd(password.value);
      if (!pwdValid.success) {
        setFormErrorAction("password", pwdValid.message);
        passwordInput?.focus();
        return false;
      }
      setFormErrorAction("password", "");

      const isPwdMismatch = password.value !== confirmPwd.value;
      if (isPwdMismatch) {
        setFormErrorAction("confirmPwd", "비밀번호가 일치하지 않습니다.");
        confirmPwdInput?.focus();
        return false;
      }
      setFormErrorAction("confirmPwd", "");
    }
    setFailedStep(""); // 모든 검증 통과 시 초기화
    return true;
  };

  const validatePwd = (value: string) => {
    const MESSAGE = { EMPTY: "입력칸이 비어있습니다.", TOO_SMALL: "비밀번호는 8글자 이상 입력해주세요." };
    const isEmpty = value === "";
    const isMinLength = value.length < 8;

    if (isEmpty) {
      return { success: false, message: MESSAGE.EMPTY };
    }
    if (isMinLength) {
      return { success: false, message: MESSAGE.TOO_SMALL };
    }
    return { success: true, message: "" };
  };

  const validateUsername = (value: string, type: string) => {
    const MESSAGE = {
      EMPTY: "입력칸이 비어있습니다.",
      TOO_SMALL: "유저이름은 4글자 이상 입력해주세요.",
      EMAIL_FAIL: "이메일의 형식이 잘못되었습니다.",
      TYPE_EMPTY: "잘못된 요청입니다.",
    };
    const isEmpty = value === "";
    const isMinLength = value.length < 4;
    const isEmail = value.includes("@");

    if (type === "") {
      return { success: false, message: MESSAGE.TYPE_EMPTY };
    }

    if (isEmpty) {
      return { success: false, message: MESSAGE.EMPTY };
    }

    if (isMinLength && type === "username") {
      return { success: false, message: MESSAGE.TOO_SMALL };
    }

    if (!isEmail && type === "email") {
      return { success: false, message: MESSAGE.EMAIL_FAIL };
    }
    return { success: true, message: "" };
  };

  const getNextPath = () => {
    let result = "";
    validateStep();
    const type = formData.type.value;
    // type 스텝인 경우 type 값에 따라 다른 경로 반환
    if (currentStep === "type") {
      if (!formData.type.value) {
        setFormErrorAction("type", "회원가입 타입을 선택해주세요.");
        return null;
      }
      result = `/signup/${formData.type.value}`;
    }

    if (currentStep === "username") {
      let usernameError = "";
      if (!formData.username.value) {
        usernameError = "필수입력칸이 비어있습니다.";
      }
      if (formData.username.value.length < 4 && type === "username") {
        usernameError = "유저이름은 4글자 이상 입력해주세요.";
      }
      if (!formData.username.value.includes("@") && type === "email") {
        usernameError = "이메일의 형식이 잘못되었습니다.";
      }

      if (usernameError) {
        setFormErrorAction("username", usernameError);

        // 포커싱: id가 "username"인 "input"에 포커스 설정
        const usernameInput = document.getElementById("username");
        if (usernameInput) {
          usernameInput.focus();
        }
        return null;
      }
      result = type === "email" ? `/signup/verify` : `/signup/password`;
    }

    if (currentStep === "password") {
      if (!formData.password.value) {
      }

      // password 통과시 server request
    }

    return result;

    // 다른 스텝들의 경로 매핑
    // const stepRoutes: Record<string, string> = {
    //   username: "/signup/verify",
    //   email: "/signup/verify",
    //   verify: "/signup/password",
    //   password: "/signup/complete",
    // };
    //
    // return stepRoutes[currentStep];
  };

  const handleNext = () => {
    const nextPath = getNextPath();
    if (!nextPath) return;

    // 현재 URL 파라미터 유지
    const currentParams = new URLSearchParams(searchParams);
    if (formData[currentStep as InitFormDataKeys]) {
      currentParams.set(currentStep, formData[currentStep as InitFormDataKeys].value);
    }

    const queryString = currentParams.toString();
    const finalPath = queryString ? `${nextPath}?${queryString}` : nextPath;

    router.push(finalPath);
  };

  const rewriteToUrl = () => {
    // 현재 URL 파라미터 유지
    const currentParams = new URLSearchParams(searchParams);
    if (formData[currentStep as InitFormDataKeys]) {
      currentParams.set(currentStep, formData[currentStep as InitFormDataKeys].value);
    }

    const queryString = currentParams.toString();
    router.push(`/signup/${failedStep}?${queryString}`);
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        {currentStep === "password" && failedStep && (
          <button onClick={rewriteToUrl} className={"body6 my-[6px] h-[40px] rounded-[20px] px-6 font-light"}>
            재작성
          </button>
        )}
        <Button
          onClick={handleNext}
          className={
            "my-[6px] h-[40px] rounded-[20px] bg-[#0b57d0] px-6 font-light text-white hover:bg-[#0847a8] hover:text-white"
          }
        >
          {currentStep === "password" ? "가입하기" : "다음"}
        </Button>
      </Row>
    </Row>
  );
}
