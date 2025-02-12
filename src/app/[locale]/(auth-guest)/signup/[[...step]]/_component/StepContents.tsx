import { CardContent } from "@/components/ui/card";
import { RadioButton } from "@/components/RadioButton";
import { Label } from "@/components/ui/label";
import { AlertTip } from "@/components/AlertTip";
import { FloatingOutlinedInput } from "@/app/components/FloatingOutlinedInput";
import React, { useState } from "react";
import Row from "@/components/Layout/Row";
import {
  InitFormDataKeys,
  InitFormDataType,
} from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";

interface IStepContents {
  formData: InitFormDataType;
  onChangeHandler: (key: InitFormDataKeys, value: string) => void;
}

function StepSelectedType({ formData, onChangeHandler }: IStepContents) {
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

function StepUserName({ formData, onChangeHandler }: IStepContents) {
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
  return;
}

function StepVerifyEmail() {
  return;
}

function StepPwd({ formData, onChangeHandler }: IStepContents) {
  const [inputType, setInputType] = useState("password");
  return (
    <CardContent className={"flex-1 animate-slide-in px-0 py-6"}>
      <FloatingOutlinedInput
        id={"password"}
        label={"비밀번호"}
        type={inputType}
        value={formData.password.value}
        onChangeValue={(value: string) => onChangeHandler("password", value)}
      />
      <FloatingOutlinedInput
        id={"confirmPwd"}
        label={"확인"}
        className={"mt-6"}
        type={inputType}
        value={formData.confirmPwd.value}
        onChangeValue={(value: string) => onChangeHandler("confirmPwd", value)}
        isError={!!formData.confirmPwd.errorMessage}
      />
      {formData.username.errorMessage && <AlertTip label={formData.username.errorMessage} />}
      <Row className={"items-center pt-2"}>
        <EmptyCheckbox
          checked={inputType === "text"}
          onCheckedChange={(checked) => setInputType(checked ? "text" : "password")}
        />
        <Label className={"ml-4 cursor-pointer"}>비밀번호 표시</Label>
      </Row>
    </CardContent>
  );
}

function EmptyCheckbox() {
  return (
    <Row className={"relative h-6 w-6 items-center justify-center"}>
      <div className={"absolute top-[-12px] p-[11px]"}>
        <div className={"relative m-1 h-[18px] w-[18px] cursor-pointer rounded-[2px] border-2 border-[#444746]"} />
      </div>
    </Row>
  );
}

export { StepSelectedType, StepUserName, StepEmail, StepVerifyEmail, StepPwd };
