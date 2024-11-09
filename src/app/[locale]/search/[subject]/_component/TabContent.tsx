"use client";
import { notFound } from "next/navigation";
import TopicButton from "@/components/TopicButton";
import Row from "@/components/Layout/Row";
import Text from "@/components/Layout/Text";
import { IconDropDownDown } from "@/assets/svg";
import React from "react";
import { SiteCard } from "@/app/[locale]/search/[subject]/_component/MainCard";
import { useTranslations } from "next-intl";

export default function TabContent(props: {
  target: "tags" | "sites" | string;
  data: any;
}) {
  const { target, data } = props;
  switch (target) {
    case "tags":
      return <TagsContent data={data} />;
    case "sites":
      return <SitesContent data={data} />;
    default:
      return notFound();
  }
}

function TagsContent({ data }: { data: any }) {
  const t = useTranslations();
  return (
    <div className={"relative"}>
      {data.map((topic: any) => {
        const { id, value, count } = topic;
        return (
          <TopicButton
            key={id}
            href={`/tag/${value}`}
            lastPath={value}
            className={"mb-[8px] mr-[18px] tb:mr-[18px]"}
          >
            {topic.value}
          </TopicButton>
        );
      })}
      <Row
        className={
          "show-more-x absolute bottom-0 h-[46px] w-full items-end justify-center gap-[4px]"
        }
      >
        <Text className={"body3 flex h-fit cursor-pointer items-center"}>
          {t("show_more")}
        </Text>
        <IconDropDownDown
          className={"relative h-[18px] w-[18px] cursor-pointer"}
        />
      </Row>
    </div>
  );
}

function SitesContent({ data }: { data: { sites: any[]; total: number } }) {
  const { sites, total } = data;

  return sites.map((site, index) => (
    <SiteCard
      key={index}
      site={site}
      isFirst={index === 0}
      isLast={total === index + 1}
      hasMore={total === index + 1}
    />
  ));
}
