"use client";
import { Col, Row } from "@/components/layout";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import Tip from "@/app/components/Tip";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { fetchAccountInfo, sendEmailVerificationForEmailUpdate } from "@/service/user-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { emailRegex } from "@/config";
import { useTranslation } from "@/app/i18n/client";
import { toast } from "sonner";

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
  const { mutate, isPending } = useMutation({
    mutationFn: sendEmailVerificationForEmailUpdate,
    onSuccess: () => {
      toast.success(`${email}로 인증메일이 발송되었습니다.`);
    },
    onError: () => {},
  });

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setEmail(_email);
  }, [_email]);

  const onclickHandler = () => {
    let error = "";
    if (!emailRegex.test(email)) {
      error = t("error.data.invalid_email");
    }

    setError(error);
    const hasError = !!error;
    if (hasError) return;
    mutate({ email });
  };
  return (
    <Col className={"gap-2"}>
      <Label font={"heading6"} htmlFor={"email"}>
        Email
      </Label>
      <Row className={"gap-2"}>
        <Input id={"email"} value={email} onChange={(e) => setEmail(e.target.value.trim())} />
        <Row>
          <Button
            disabled={isPending || !email || _email === email}
            variant={"primary"}
            className={"h-full rounded-[5px] font-semibold"}
            onClick={onclickHandler}
          >
            Save email
          </Button>
        </Row>
      </Row>
      {error && <p className={"body7 pl-2 text-destructive"}>{error}</p>}
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
