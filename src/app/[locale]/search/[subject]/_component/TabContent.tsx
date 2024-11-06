import { notFound } from "next/navigation";
import TopicButton from "@/components/TopicButton";
import Row from "@/components/Layout/Row";
import Text from "@/components/Layout/Text";
import { IconDropDownDown } from "@/assets/svg";
import React from "react";

export default function TabContent({
  target,
  data,
}: {
  target: "tags" | "sites" | string;
  data: any;
}) {
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
  return (
    <div className={"relative"}>
      {data.map((topic: any) => {
        const { id, value, count } = topic;
        return (
          <TopicButton
            key={id}
            href={`/reference/${value}`}
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
        <Text className={"body2 flex h-fit cursor-pointer items-center"}>
          Show more
        </Text>
        <IconDropDownDown
          className={"relative h-[18px] w-[18px] cursor-pointer"}
        />
      </Row>
    </div>
  );
}

function SitesContent({ data }: { data: any }) {
  const sites = {
    name: "사이트 이름",
    description:
      "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
    imageUrl:
      "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["태그1", "태그2", "태그3"],
    rating: 4.5,
    visitors: "1.2K",
    lastUpdate: "2024-03-15",
  };
  return (
    <Row className={"flex flex-wrap"}>
      <Row>
        <div>
          <h2 className={"heading1 ellipsisLine2 max-h-[90px]"}>
            {sites.name}
          </h2>
          <div className={"pt-[8px]"}>
            <h3 className={"body3 ellipsisLine2 max-h-[40px]"}>
              {sites.description}
            </h3>
          </div>
        </div>
      </Row>
      <Row className={"mt-[20px] w-full border-b border-gray-300"} />
    </Row>
  );
}
