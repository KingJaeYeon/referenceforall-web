import useSignupStore from "@/store/useSignupStore";
import { useMutation } from "@tanstack/react-query";
import { validUsername } from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { getInputElement, saveFormDataToLocal } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/util";
import { Row } from "@/components/layout";
import { NextButton } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslation } from "@/app/i18n/client";
import { emailRegex, usernameRegex } from "@/config";

export function StepUserNameBtn() {
  const { formData, onErrorHandler, setFailStep } = useSignupStore();
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
      const message = t(e.message) ?? t("error.data.invalid_username");
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
      onErrorHandler("username", t("error.data.invalid_length", { cnt: 4 }));
      setFailStep("username");
      input?.focus();
      return false;
    }

    if (inValidEmail) {
      onErrorHandler("username", t("error.data.invalid_email"));
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
