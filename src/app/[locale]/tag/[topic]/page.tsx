import ReferencePage from "@/app/[locale]/tag/[topic]/_component/ReferencePage";
import React from "react";

export const revalidate = false;

export default async function Page({
  params: _params,
  searchParams: _searchParams,
}: {
  params: Promise<{ topic: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
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

  return <ReferencePage sites={sites} />;
}
