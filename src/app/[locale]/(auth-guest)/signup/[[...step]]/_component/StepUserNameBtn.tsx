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
      onErrorHandler("username", t(e.message));
    },
  });

  const validate = async (value: string) => {
    const isEmpty = value === "";
    const inValidUsername = value.length < 4 && formData.type.value === "username";
    const inValidEmail = !(value.includes("@") && value.split("@")[1].length > 4) && formData.type.value === "email";

    if (isEmpty) {
      onErrorHandler("username", "입력칸이 비어있습니다.");
      setFailStep("username");
      input?.focus();
      return false;
    }
    if (inValidUsername) {
      onErrorHandler("username", "유저이름은 4글자 이상 입력해주세요.");
      setFailStep("username");
      input?.focus();
      return false;
    }
    if (inValidEmail) {
      onErrorHandler("username", "이메일의 형식이 잘못되었습니다.");
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
        <NextButton onClick={onClickHandler} isLoading={isPending} />
      </Row>
    </Row>
  );
}
