import useSignupStore from "@/store/useSignupStore";
import { useRouter } from "next/navigation";
import { saveFormDataToLocal } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/util";
import { Row } from "@/components/layout";
import { NextButton } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslation } from "@/app/i18n/client";

export function StepSelectedTypeBtn() {
  const { formData, onErrorHandler } = useSignupStore();
  const { t } = useTranslation();
  const router = useRouter();

  const validateType = (type: string) => {
    const typeValid = ["username", "email"].includes(type);
    if (!typeValid) {
      onErrorHandler("type", t("error.data.invalid_type"));
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
