import useSignupStore from "@/store/useSignupStore";
import { getInputElement, saveFormDataToLocal } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { validSignupCode } from "@/service/auth-service";
import { toast } from "sonner";
import { Row } from "@/components/layout";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslation } from "@/app/i18n/client";

export function StepVerifyEmailBtn() {
  const { formData, onErrorHandler, setFailStep, setResend } = useSignupStore();
  const input = getInputElement("verify");
  const { t } = useTranslation();
  const { push, replace } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: validSignupCode,
    onSuccess: () => {
      onErrorHandler("verify", "");
      saveFormDataToLocal("verify", formData, () => push("/signup"));
      push("/signup/password");
    },
    onError: (e: any) => {
      input?.focus();
      if (e.code === "AUTH-006") {
        setResend(true);
      }
      onErrorHandler("verify", t(e.message));
    },
  });

  const validate = async (value: string) => {
    if (formData.type.value !== "email") {
      toast.error(t("error.common.wrong_approach"));
      return replace("/signup");
    }

    const isEmpty = value === "";
    const lengthCheck = value.length < 10;

    if (isEmpty) {
      onErrorHandler("verify", t("error.common.input_empty"));
      setFailStep("verify");
      input?.focus();
      return false;
    }

    if (lengthCheck) {
      onErrorHandler("verify", t("error.common.length"));
      setFailStep("verify");
      input?.focus();
      return false;
    }

    return true;
  };

  const onClickHandler = async () => {
    const isValid = await validate(formData.verify.value);
    if (!isValid) return;
    mutate({ email: formData.username.value, verify: formData.verify.value });
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton onClick={onClickHandler} isLoading={isPending} label={t("next")} />
      </Row>
    </Row>
  );
}
