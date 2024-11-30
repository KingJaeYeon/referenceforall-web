import MediumStyleCard from "@/app/[locale]/tag/[topic]/_component/MediumStyleCard";
import { AddTopic } from "@/app/[locale]/tag/[topic]/_component/AddTopic";
import Text from "@/components/Layout/Text";
import { getTranslations } from "next-intl/server";
import Row from "@/components/Layout/Row";
import { Suspense } from "react";

export const revalidate = false;

interface PageProps {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({
  params: _params,
  searchParams,
}: PageProps) {
  const params = await _params;
  const topic = decodeURI(params.topic).split("-").join(" ");
  return {
    title: "Tag - " + topic,
    description: "Tag Page",
  };
}

export default async function TagDetailsPage({
  params: _params,
  searchParams: _searchParams,
}: PageProps) {
  const t = await getTranslations();
  const params = await _params;
  const topic = decodeURI(params.topic);
  const searchParams = await _searchParams;
  const searchMode = searchParams.searchMode;
  const tags = !!searchParams.tags
    ? decodeURI(searchParams.tags).split(",")
    : [];

  const sites = [
    {
      id: "c4c6d219-56c1-4c2a-b67b-b56e1367bbd4",
      name: "사이트 이름",
      description:
        "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
    },
    {
      id: "58d1cdf9-5864-444b-be85-4ee7fddbcbd3",
      name: "사이트 이름",
      description:
        "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
    },
    {
      id: "c4c6d219-56c1-4c2a-b67b-b56e1367bbd4",
      name: "사이트 이름",
      description:
        "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
    },
  ];

  return (
    <>
      <Text
        className={
          "heading1 min-h-[30px] font-medium capitalize md:min-h-[52px] md:text-[42px]"
        }
      >
        {topic.split("-").join(" ")}
      </Text>
      <Text className={"body4 md:body3 mb-[24px] mt-[12px] md:mt-[16px]"}>
        {t("result_sites_cnt", { count: 10 })}
      </Text>
      <AddTopic />
      <Row className={"mb-[100px] mt-[40px] w-full flex-wrap text-center"}>
        <div className="custom-680:grid-cols-2 grid w-full gap-8 ls:grid-cols-3">
          {sites.map((site, index) => (
            <Row className={"relative h-auto"} key={index}>
              <Suspense fallback={<div>Loading...</div>}>
                <MediumStyleCard site={site} />
              </Suspense>
            </Row>
          ))}
        </div>
      </Row>
    </>
  );
}
