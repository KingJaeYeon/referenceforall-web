"use client";
import { Col, Row } from "@/components/layout";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Tip from "@/app/components/Tip";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAccountInfo } from "@/service/user.service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailRegex } from "@/config";
import { useTranslation } from "@/app/i18n/client";
import { toast } from "sonner";
import { sendEmailVerificationForEmailUpdate } from "@/service/email-verification.service";
import { IException } from "@/lib/axios";

export default function EditAccountPage() {
  const { data } = useSuspenseQuery({
    queryFn: fetchAccountInfo,
    queryKey: ["account-info"],
  });

  return (
    <Col className={"w-full justify-between gap-10 pb-[100px]"}>
      <Col className={"gap-6"}>
        <p className={"heading2"}>Account</p>
        <EditEmail email={data.email} />
        <EditPassword hasPwd={data.hasPwd} />
      </Col>
    </Col>
  );
}

function EditEmail({ email: _email }: { email: string }) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: sendEmailVerificationForEmailUpdate,
    onSuccess: () => {
      toast.success(`${email.value}로 인증메일이 발송되었습니다.`);
      setTimer(60);
    },
    onError: (r: IException) => {
      if (r.code === "AUTH-006") {
        console.log(timer);
        toast.error(t(r.message, { timer: timer !== 0 ? formatTime(timer) : undefined }));
        setEmail((prev) => ({ ...prev, error: t(r.message, { timer: undefined }) }));
      } else {
        toast.error(t(r.code));
        setEmail((prev) => ({ ...prev, error: t(r.message) }));
      }
    },
  });

  const [email, setEmail] = useState({
    value: "",
    error: "",
  });

  useEffect(() => {
    setEmail((prev) => ({ ...prev, value: _email }));
  }, [_email]);

  const onclickHandler = () => {
    let error = "";
    if (!emailRegex.test(email.value)) {
      error = t("error.data.invalid_email");
    }
    setEmail((prev) => ({ ...prev, error }));

    const hasError = !!error;
    if (hasError) return;
    mutate({ email: email.value });
  };

  useEffect(() => {
    if (timer <= 0) return; // 타이머가 0이면 중단
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  // 초 단위의 시간을 mm:ss 형식으로 변환하는 함수
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Col className={"gap-2"}>
      <Label font={"heading6"} htmlFor={"email"}>
        Email
      </Label>
      <Row className={"gap-2"}>
        <Input
          id={"email"}
          hasError={!!email.error}
          value={email.value}
          onChange={(e) => setEmail((prev) => ({ ...prev, value: e.target.value.trim() }))}
        />
        <Row>
          <Button
            disabled={isPending || !email || _email === email.value}
            variant={"primary"}
            className={"h-full rounded-[5px] font-semibold"}
            onClick={onclickHandler}
          >
            {"Save email"}
          </Button>
        </Row>
      </Row>
      {email.error && <p className={"body7 pl-2 text-destructive"}>{email.error}</p>}
    </Col>
  );
}

function EditPassword({ hasPwd }: { hasPwd: boolean }) {
  return (
    <Col className={"gap-2"}>
      <Row className={"items-center gap-1"}>
        <Label font={"heading6"} htmlFor={"displayName"}>
          Password
        </Label>
        <Tip>패스워드 변경을 위해서는 이메일 인증이 필요합니다.</Tip>
      </Row>
      <Input value={hasPwd ? "*****" : ""} placeholder={"패스워드를 설정해주세요."} maxLength={50} readOnly />
      {/*{error.username && <p className={"body7 pl-2 text-destructive"}>{error.username}</p>}*/}
    </Col>
  );
}
