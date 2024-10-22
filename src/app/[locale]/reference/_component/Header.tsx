"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AddTopicPopup } from "@/app/[locale]/reference/_component/AddTopicPopup";
import { useSearchParams } from "next/navigation";

export function Header() {
  const t = useTranslations();
  const [tags, setTags] = useState<string[]>([]);
  const [searchMode, setSearchMode] = useState<string>("and");
  const searchParams = useSearchParams();

  useEffect(() => {
    setTags(searchParams.get("tags")?.split(",") || []);
    setSearchMode(searchParams.get("searchMode") || "and");
  }, [searchParams]);

  const hasTags = tags.length > 0;
  return (
    <>
      <Text className={"heading1 h-[52px] text-[42px] font-medium"}>
        Productivity
      </Text>
      <Text className={"body3 mb-6 mt-4 h-[24px]"}>
        {t("result_sites_cnt", { count: 10 })}
      </Text>
      <Row className={"justify-center gap-[6px]"}>
        {hasTags &&
          tags.map((tag) => (
            <Button
              key={tag}
              className={"w-fit pt-[1px] font-medium"}
              rounded={"full"}
            >
              {tag}
            </Button>
          ))}
        {hasTags && (
          <Button className={"w-fit pt-[1px] font-medium"} rounded={"full"}>
            {t("searchMode")}: {searchMode.toUpperCase()}
          </Button>
        )}
        <AddTopicPopup>
          <Button className={"w-fit pt-[1px] font-medium"} rounded={"full"}>
            <IconPlus className={"h-4 w-4"} /> {t("add_topic")}
          </Button>
        </AddTopicPopup>
      </Row>
    </>
  );
}
