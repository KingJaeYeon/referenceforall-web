"use client";
import React from "react";
import { useRouter } from "@/i18n/routing";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { InitFormDataKeys } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";

interface FormField {
  value: string;
  isError: boolean;
}

type FormData = Record<string, FormField>;

interface NextStepButtonProps {
  currentStep: string;
  formData: FormData;
  setFormErrorAction: (key: InitFormDataKeys, value: boolean) => void;
  className?: string;
}

export default function NextStepButton({ currentStep, formData, setFormErrorAction, className }: NextStepButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getNextPath = () => {
    // type 스텝인 경우 type 값에 따라 다른 경로 반환
    if (currentStep === "type") {
      if (!formData.type.value) {
        setFormErrorAction("type", true);
        return null;
      }
      return `/signup/${formData.type.value}`;
    }

    // 다른 스텝들의 경로 매핑
    const stepRoutes: Record<string, string> = {
      username: "/signup/verify",
      email: "/signup/verify",
      verify: "/signup/password",
      password: "/signup/complete",
    };

    return stepRoutes[currentStep];
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
          다음
        </Button>
      </Row>
    </Row>
  );
}
