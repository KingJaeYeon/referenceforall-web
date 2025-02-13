import useSignupStore from "@/store/useSignupStore";
import { useRouter } from "@/i18n/routing";
import { saveFormDataToLocal } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import Row from "@/components/Layout/Row";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";

export function StepSelectedTypeBtn() {
  const { formData, onErrorHandler } = useSignupStore();
  const router = useRouter();

  const validateType = (type: string) => {
    const typeValid = ["username", "email"].includes(type);
    if (!typeValid) {
      onErrorHandler("type", "회원가입 타입을 선택해주세요.");
      return false;
    }
    onErrorHandler("type", "");
    return true;
  };

  const onClickHandler = () => {
    if (!validateType(formData.type.value)) return;
    saveFormDataToLocal("type", formData, router.replace("/signup"));
    router.push(`/signup/${formData.type.value}`);
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton onClick={onClickHandler} />
      </Row>
    </Row>
  );
}
