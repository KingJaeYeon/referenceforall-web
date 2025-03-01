import TopicButton from "@/components/TopicButton";
import { Row,Text } from "@/components/layout";
import { IconDropDownDown } from "@/assets/svg";
import React from "react";
import { MainCard } from "@/app/[locale]/(main)/search/[subject]/_component/MainCard";
import { getTranslation } from "@/app/i18n";

export default function NavContent({ library, locale }: { library?: string; locale: string }) {
  switch (library) {
    case "root":
      return <TagsContent data={{}} locale={locale} />;
    case "saved":
      return <SitesContent data={{}} locale={locale} />;
  }
}

async function TagsContent({ data, locale }: { data: any; locale: string }) {
  const { t } = await getTranslation(locale);
  return null;
  return (
    <div className={"relative"}>
      {data.map((topic: any) => {
        const { id, value, count } = topic;
        return (
          <TopicButton key={id} href={`/tag/${value}`} lastPath={value} className={"mb-[8px] mr-[18px] md:mr-[18px]"}>
            {topic.value}
          </TopicButton>
        );
      })}
      <Row className={"show-more-x absolute bottom-0 h-[46px] w-full items-end justify-center gap-[4px]"}>
        <Text className={"body3 flex h-fit cursor-pointer items-center"}>{t("show_more")}</Text>
        <IconDropDownDown className={"relative h-[18px] w-[18px] cursor-pointer"} />
      </Row>
    </div>
  );
}

function SitesContent({ data, locale }: { data: any; locale: string }) {
  return null;
  const { sites, total } = data;

  return sites.map((site: any, index: any) => (
    <MainCard
      key={index}
      site={site}
      isFirst={index === 0}
      isLast={total === index + 1}
      hasMore={total === index + 1}
    />
  ));
}
