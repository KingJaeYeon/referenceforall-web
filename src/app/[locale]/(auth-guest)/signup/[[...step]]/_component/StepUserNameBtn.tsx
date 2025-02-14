import useSignupStore from "@/store/useSignupStore";
import { useMutation } from "@tanstack/react-query";
import { validUsername } from "@/service/auth-service";
import { useRouter } from "@/i18n/routing";
import { getInputElement, saveFormDataToLocal } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import Row from "@/components/Layout/Row";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslations } from "next-intl";

export function StepUserNameBtn() {
  const { formData, onErrorHandler, setFailStep } = useSignupStore();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const input = getInputElement("username");
  const t = useTranslations();
  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: validUsername,
    onSuccess: () => {
      onErrorHandler("username", "");
      saveFormDataToLocal("username", formData, push("/signup"));
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
    const inValidUsername = value.length < 4 && formData.type.value === "username";
    const inValidEmail = !emailRegex.test(value) && formData.type.value === "email";

    if (isEmpty) {
      onErrorHandler("username", t("error.common.input_empty"));
      setFailStep("username");
      input?.focus();
      return false;
    }
    if (inValidUsername) {
      const i18Key = t("username");
      onErrorHandler("username", t("error.common.min_length", { key: i18Key, length: 4 }));
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
