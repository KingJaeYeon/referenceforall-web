"use client";
import Text from "@/components/Layout/Text";
import Col from "@/components/Layout/Col";
import React from "react";
import TopicButton from "@/components/TopicButton";
import Row from "@/components/Layout/Row";
import { Link } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NavContent(props: {
  target: "tags" | "sites" | string;
  data: any;
}) {
  const { target, data } = props;

  switch (target) {
    case "tags":
      return <NavSites data={data} />;
    case "sites":
      return <NavTags data={data} />;
    default:
      return null;
  }
}
function NavSites({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const t = useTranslations();
  return (
    <Col className={"mb-[30px] mt-[40px]"}>
      <Text className={"heading4 pb-[22px] font-semibold"}>
        Sites matching {q}
      </Text>
      <Col>
        {data?.sites.slice(0, 3).map((item: any) => (
          <Link key={item.id} className={"mb-[20px]"} href={`/site/${item.id}`}>
            <Text className={"heading4 mb-[6px] font-semibold"}>
              {item.name}
            </Text>
            <Row>
              <Text className={"body4 ellipsisLine2 text-gray-500"}>
                {item.description}
              </Text>
            </Row>
          </Link>
        ))}
        <Link className={"body5 text-green-600"} href={`/search/sites?q=${q}`}>
          {t("see_all")}
        </Link>
      </Col>
    </Col>
  );
}
function NavTags({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const t = useTranslations();
  return (
    <Col className={"mb-[30px] mt-[40px]"}>
      <Text className={"heading4 pb-[22px] font-semibold"}>
        Topics matching {q}
      </Text>
      <Row className={"flex-wrap"}>
        {data?.slice(0, 6).map((item: any) => (
          <TopicButton
            key={item.id}
            href={`/tag/${item.value}`}
            lastPath={item.value}
            className={"mb-[8px] mr-[18px] md:mr-[18px]"}
          >
            {item.value}
          </TopicButton>
        ))}
      </Row>
      <Link
        className={"body5 mt-[6px] text-green-600"}
        href={`/search/tags?q=${q}`}
      >
        {t("see_all")}
      </Link>
    </Col>
  );
}
