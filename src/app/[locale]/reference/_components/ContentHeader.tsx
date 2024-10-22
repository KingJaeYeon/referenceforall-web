"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import React from "react";
import { useTranslations } from "next-intl";
import { AddTopicPopup } from "@/app/[locale]/reference/_components/AddTopicPopup";

export function ContentHeader() {
  const t = useTranslations();
  return (
    <>
      <Text className={"heading1 h-[52px] text-[42px] font-medium"}>
        Productivity
      </Text>
      <Text className={"body3 mb-6 mt-4 h-[24px]"}>
        {t("result_sites_cnt", { count: 10 })}
      </Text>
      <Row className={"justify-center"}>
        <AddTopicPopup>
          <Button className={"w-fit font-medium"} rounded={"full"}>
            <IconPlus className={"h-4 w-4"} /> {t("add_topic")}
          </Button>
        </AddTopicPopup>
      </Row>
    </>
  );
}
