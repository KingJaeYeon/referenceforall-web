"use client";
import { Row } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import { useEffect, useState } from "react";

import { AddTopicPopup } from "@/app/[locale]/tag/[topic]/_component/AddTopicPopup";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export function AddTopic() {
  const { t } = useTranslation();
  const [tags, setTags] = useState<string[]>([]);
  const [searchMode, setSearchMode] = useState<string>("and");
  const searchParams = useSearchParams();

  useEffect(() => {
    setTags(searchParams.get("tags")?.split(",") || []);
    setSearchMode(searchParams.get("searchMode") || "and");
  }, [searchParams]);

  const hasTags = tags.length > 0;
  return (
    <Row className={"scrollNone scroll justify-center gap-[6px] overflow-y-hidden overflow-x-scroll scroll-smooth"}>
      {hasTags &&
        tags.map((tag) => (
          <Button key={tag} className={"w-fit pt-[1px] font-medium capitalize"} rounded={"full"}>
            {tag.split("-").join(" ")}
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
  );
}
