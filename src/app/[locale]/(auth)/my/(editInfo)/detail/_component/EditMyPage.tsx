"use client";
import { Col } from "@/components/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "@/service/user-service";
import React from "react";
import { EditAvatar } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditAvatar";

export default function EditMyPage() {
  const { data } = useSuspenseQuery({
    queryFn: fetchMyProfile,
    queryKey: ["my-profile"],
  });
  return (
    <Col className={"w-full items-center justify-between md:flex-row"}>
      <Col className={"items-center md:flex-row"}>
        <EditAvatar />
      </Col>
    </Col>
  );
}
