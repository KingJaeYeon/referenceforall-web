"use client";
import React from "react";
import { useRouter } from "@/i18n/routing";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { InitFormDataKeys } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";

interface FormField {
  value: string;
  errorMessage: string;
}

type FormData = Record<string, FormField>;

interface NextStepButtonProps {
  currentStep: string;
  formData: FormData;
  setFormErrorAction: (key: InitFormDataKeys, value: string) => void;
  className?: string;
}

export default function NextStepButton({ currentStep, formData, setFormErrorAction, className }: NextStepButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getNextPath = () => {
    let result = "";
    // type 스텝인 경우 type 값에 따라 다른 경로 반환
    if (currentStep === "type") {
      if (!formData.type.value) {
        setFormErrorAction("type", "회원가입 타입을 선택해주세요.");
        return null;
      }
      result = `/signup/${formData.type.value}`;
    }

    if (currentStep === "username") {
      const type = formData.type.value;
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
    if (formData[currentStep]) {
      currentParams.set(currentStep, formData[currentStep].value);
    }

    const queryString = currentParams.toString();
    const finalPath = queryString ? `${nextPath}?${queryString}` : nextPath;

    router.push(finalPath);
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row>
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
