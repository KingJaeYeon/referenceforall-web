import useSignupStore from "@/store/useSignupStore";
import { useMutation } from "@tanstack/react-query";
import { validUsername } from "@/service/auth-service";
import { useRouter } from "next/navigation";
import { getInputElement, saveFormDataToLocal } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import Row from "@/components/Layout/Row";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslation } from "@/app/i18n/client";

export function StepUserNameBtn() {
  const { formData, onErrorHandler, setFailStep } = useSignupStore();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
  const input = getInputElement("username");
  const { t } = useTranslation();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: validUsername,
    onSuccess: () => {
      onErrorHandler("username", "");
      saveFormDataToLocal("username", formData, () => push("/signup"));
      const path = formData.type.value === "email" ? "/signup/verify" : "/signup/password";
      push(path);
    },
    onError: (e) => {
      input?.focus();
      const message = t(e.message) ?? t("error_auth.error.auth.invalid_username");
      onErrorHandler("username", message);
    },
  });

  const validate = async (value: string) => {
    const isEmpty = value === "";
    const inValidEmail = !emailRegex.test(value) && formData.type.value === "email";
    const inValidUsername = !usernameRegex.test(value) && formData.type.value === "username";
    if (isEmpty) {
      onErrorHandler("username", t("error.common.input_empty"));
      setFailStep("username");
      input?.focus();
      return false;
    }

    if (inValidUsername) {
      onErrorHandler("username", t("error.auth.username_invalid", { cnt: 4 }));
      setFailStep("username");
      input?.focus();
      return false;
    }

    if (inValidEmail) {
      onErrorHandler("username", t("error.auth.email_invalid"));
      setFailStep("username");
      input?.focus();
      return false;
    }
    return true;
  };

  const onClickHandler = async () => {
    const isValid = await validate(formData.username.value);
    if (!isValid) return;
    mutate(formData.username.value);
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton
          onClick={onClickHandler}
          isLoading={isPending}
          label={formData.type.value === "email" ? t("send_verify") : t("next")}
        />
      </Row>
    </Row>
  );
}
