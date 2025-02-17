import useSignupStore from "@/store/useSignupStore";
import { useRouter } from "next/navigation";
import { saveFormDataToLocal } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import Row from "@/components/Layout/Row";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslations } from "next-intl";

export function StepSelectedTypeBtn() {
  const { formData, onErrorHandler } = useSignupStore();
  const t = useTranslations();
  const router = useRouter();

  const validateType = (type: string) => {
    const typeValid = ["username", "email"].includes(type);
    if (!typeValid) {
      onErrorHandler("type", t("error.auth.selected_type"));
      return false;
    }
    onErrorHandler("type", "");
    return true;
  };

  const onClickHandler = () => {
    if (!validateType(formData.type.value)) return;
    saveFormDataToLocal("type", formData, () => router.replace("/signup"));

    router.push(`/signup/${formData.type.value}`);
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton onClick={onClickHandler} label={t("next")} />
      </Row>
    </Row>
  );
}
