import { CardContent } from "@/components/ui/card";
import { RadioButton } from "@/components/RadioButton";
import { Label } from "@/components/ui/label";
import { AlertTip } from "@/components/AlertTip";
import { FloatingOutlinedInput } from "@/app/components/FloatingOutlinedInput";
import React, { useState } from "react";
import Row from "@/components/Layout/Row";
import { EmptyCheckbox } from "@/app/components/EmptyCheckbox";
import useSignupStore from "@/store/useSignupStore";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { sendSignupCode } from "@/service/auth-service";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

function StepSelectedType() {
  const { formData, onChangeHandler } = useSignupStore();

  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <RadioButton
        value={"username"}
        selected={formData.type.value}
        onChange={(value) => onChangeHandler("type", value)}
        className={"gap-4 border-b border-[#c4c7c5] py-4"}
        isError={!!formData.type.errorMessage}
      >
        <Label
          htmlFor="email"
          font={"body4"}
          onClick={() => onChangeHandler("type", "username")}
          className={"cursor-pointer"}
        >
          유저이름
        </Label>
      </RadioButton>
      <RadioButton
        value={"email"}
        selected={formData.type.value}
        onChange={(value) => onChangeHandler("type", value)}
        className={"gap-4 border-b border-[#c4c7c5] py-4"}
        isError={!!formData.type.errorMessage}
      >
        <Label
          htmlFor="email"
          font={"body4"}
          onClick={() => onChangeHandler("type", "email")}
          className={"cursor-pointer"}
        >
          이메일
        </Label>
      </RadioButton>
      {formData.type.errorMessage && <AlertTip label={formData.type.errorMessage} />}
    </CardContent>
  );
}

function StepUserName() {
  const { formData, onChangeHandler } = useSignupStore();
  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <FloatingOutlinedInput
        id={"displayName"}
        label={"닉네임(선택사항)"}
        value={formData.displayName.value}
        onChangeValue={(value: string) => onChangeHandler("displayName", value)}
      />
      <FloatingOutlinedInput
        id={"username"}
        label={"유저이름"}
        className={"mt-6"}
        value={formData.username.value}
        onChangeValue={(value: string) => onChangeHandler("username", value)}
        isError={!!formData.username.errorMessage}
      />
      {formData.username.errorMessage && <AlertTip label={formData.username.errorMessage} />}
    </CardContent>
  );
}

function StepEmail() {
  const { formData, onChangeHandler } = useSignupStore();
  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <FloatingOutlinedInput
        id={"displayName"}
        label={"닉네임(선택사항)"}
        value={formData.displayName.value}
        onChangeValue={(value: string) => onChangeHandler("displayName", value)}
      />
      <FloatingOutlinedInput
        id={"username"}
        label={"이메일"}
        required
        className={"mt-6"}
        value={formData.username.value}
        onChangeValue={(value: string) => onChangeHandler("username", value)}
        isError={!!formData.username.errorMessage}
      />
      {formData.username.errorMessage && <AlertTip label={formData.username.errorMessage} />}
    </CardContent>
  );
}

function StepVerifyEmail() {
  const { formData, onChangeHandler } = useSignupStore();
  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <p
        className={"body6 pb-3 pt-1 text-[0.8rem]"}
      >{`인증 코드가 포함된 이메일이 ${formData.username.value}(으)로 전송되었습니다.`}</p>
      <FloatingOutlinedInput
        id={"verify"}
        required
        label={"인증코드"}
        value={formData.verify.value}
        onChangeValue={(value: string) => onChangeHandler("verify", value)}
        isError={!!formData.verify.errorMessage}
      />
      {formData.verify.errorMessage && (
        <Row className={"items-center gap-2"}>
          <AlertTip label={formData.verify.errorMessage} />
          <ResendMailBtn />
        </Row>
      )}
    </CardContent>
  );
}

function ResendMailBtn() {
  const { formData, onErrorHandler, resend, setResend } = useSignupStore();
  const t = useTranslations();

  const { isPending, mutate } = useMutation({
    mutationFn: sendSignupCode,
    onSuccess: () => {
      setResend(false);
      toast.success(t("send_verify"));
    },
    onError: (e) => {
      onErrorHandler("verify", t(e.message));
    },
  });

  if (!resend) {
    return;
  }

  const onClickHandler = () => {
    mutate(formData.username.value);
  };

  return (
    <button className={"body7 pt-2 text-blue-700"} onClick={onClickHandler} disabled={isPending}>
      {isPending ? <Loader2 className={"h-3.5 w-3.5 animate-spin"} /> : "인증메일 보내기"}
    </button>
  );
}

function StepPwd() {
  const [inputType, setInputType] = useState("password");
  const { formData, onChangeHandler } = useSignupStore();
  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <FloatingOutlinedInput
        id={"password"}
        label={"비밀번호"}
        required
        type={inputType}
        value={formData.password.value}
        onChangeValue={(value: string) => onChangeHandler("password", value)}
        isError={!!formData.password.errorMessage}
      />
      <FloatingOutlinedInput
        id={"confirmPwd"}
        label={"확인"}
        required
        className={"mt-6"}
        type={inputType}
        value={formData.confirmPwd.value}
        onChangeValue={(value: string) => onChangeHandler("confirmPwd", value)}
        isError={!!formData.confirmPwd.errorMessage}
      />
      {(formData.password.errorMessage || formData.confirmPwd.errorMessage) && (
        <AlertTip label={formData.password.errorMessage || formData.confirmPwd.errorMessage} />
      )}
      <Row className={"items-center pt-2"}>
        <EmptyCheckbox
          isChecked={inputType === "text"}
          setIsChecked={(checked) => setInputType(checked ? "text" : "password")}
          id={"pwd-visible"}
        />
        <Label className={"ml-4 cursor-pointer"} htmlFor={"pwd-visible"}>
          비밀번호 표시
        </Label>
      </Row>
    </CardContent>
  );
}

export { StepSelectedType, StepUserName, StepEmail, StepVerifyEmail, StepPwd };
