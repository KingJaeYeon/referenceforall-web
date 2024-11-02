"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AddTopicPopup } from "@/app/[locale]/reference/[topic]/_component/AddTopicPopup";
import { useSearchParams } from "next/navigation";

export function Header({ topic }: { topic: string }) {
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
      <Text
        className={
          "heading1 min-h-[30px] font-medium tb:min-h-[52px] tb:text-[42px]"
        }
      >
        {topic}
      </Text>
      <Text className={"body4 tb:body3 mb-[24px] mt-[12px] tb:mt-[16px]"}>
        {t("result_sites_cnt", { count: 10 })}
      </Text>
      <Row
        className={
          "scrollNone scroll justify-center gap-[6px] overflow-y-hidden overflow-x-scroll scroll-smooth"
        }
      >
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
