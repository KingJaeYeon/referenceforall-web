import ReferencePage from "@/app/[locale]/tag/[topic]/_component/ReferencePage";
import { randomUUID } from "node:crypto";
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
      id: randomUUID(),
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
      id: randomUUID(),
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
      id: randomUUID(),
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
