import useSignupStore from "@/store/useSignupStore";

import { getInputElement } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/util";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/service/user-service";
import { toast } from "sonner";
import { Row } from "@/components/layout";
import { NextButton } from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/NextButton";
import React from "react";
import { useTranslation } from "@/app/i18n/client";

export function StepPwdBtn() {
  const { formData, onErrorHandler, initData } = useSignupStore();
  const { t } = useTranslation();
  const passwordInput = getInputElement("password");
  const confirmPwdInput = getInputElement("confirmPwd");

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      localStorage.removeItem("signup");
      initData();
      toast.success(t("success.signup"));
      window.location.href = "/";
    },
    onError: (e) => {
      onErrorHandler("password", t(e.message));
      passwordInput?.focus();
    },
  });

  const validate = async (password: string, confirmPwd: string) => {
    const isMinLength = password.length < 8;
    const isPwdMismatch = password !== confirmPwd;

    if (isMinLength) {
      const i18pwd = t("password");
      onErrorHandler("password", t("error.common.min_length", { key: i18pwd, length: 8 }));
      passwordInput?.focus();
      return false;
    }
    if (isPwdMismatch) {
      onErrorHandler("confirmPwd", t("error.data.mismatch_password"));
      confirmPwdInput?.focus();
      return false;
    }
    onErrorHandler("password", "");
    onErrorHandler("confirmPwd", "");
    return true;
  };

  const onClickHandler = async () => {
    const isValid = await validate(formData.password.value, formData.confirmPwd.value);
    if (!isValid) return;

    mutate({
      username: formData.username.value,
      password: formData.password.value,
      displayName: formData.displayName.value,
      verifyCode: formData.verify.value,
      type: formData.type.value,
    });
  };

  return (
    <Row className={"mt-[32px] justify-end"}>
      <Row className={"gap-4"}>
        <NextButton onClick={onClickHandler} disabled={isPending} label={t("create_account")} />
      </Row>
    </Row>
  );
}
