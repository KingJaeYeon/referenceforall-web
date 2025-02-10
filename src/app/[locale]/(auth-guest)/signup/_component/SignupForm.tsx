"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Col from "@/components/Layout/Col";
import { RadioButton } from "@/components/RadioButton";
import Row from "@/components/Layout/Row";

export default function SignupForm() {
  const [type, setType] = useState();

  return (
    <React.Fragment>
      <Col className={"md:flex-row"}>
        <CardHeader className="flex-1 items-start space-y-3 p-6 pl-0">
          <CardTitle className="heading1 text-[2rem]">모두의 레퍼런스 회원가입</CardTitle>
          <CardDescription font={"body3"}>아래 정보를 입력하여 계정을 생성하세요</CardDescription>
        </CardHeader>
        <CardContent className={"flex-1 py-6 px-0"}>
          <RadioButton
            value={"username"}
            selected={type}
            onChange={setType}
            className={"gap-4 border-b border-[#c4c7c5] py-4"}
          >
            <Label htmlFor="email" font={"body4"} onClick={() => setType("username")} className={"cursor-pointer"}>
              유저이름
            </Label>
          </RadioButton>
          <RadioButton
            value={"email"}
            selected={type}
            onChange={setType}
            className={"gap-4 border-b border-[#c4c7c5] py-4"}
          >
            <Label htmlFor="email" font={"body4"} onClick={() => setType("email")} className={"cursor-pointer"}>
              이메일
            </Label>
          </RadioButton>
        </CardContent>
      </Col>
      <Row className={"mt-[32px] justify-end"}>
        <Row>
          <Button
            className={
              "my-[6px] h-[40px] rounded-[20px] bg-[#0b57d0] px-6 font-light text-white hover:bg-[#0847a8] hover:text-white"
            }
          >
            다음
          </Button>
        </Row>
      </Row>
    </React.Fragment>
  );
}
