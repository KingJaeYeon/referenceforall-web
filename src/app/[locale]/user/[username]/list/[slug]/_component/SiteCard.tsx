"use client";

import { useState } from "react";
import { MainCard } from "@/app/[locale]/search/[subject]/_component/MainCard";

export function SiteCard({ bookmarkId }: { bookmarkId: string }) {
  const [sites, setSites] = useState([
    {
      id: "12cdsdadsd",
      name: "Medium",
      description:
        "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
      watchList: 100,
      comments: 20,
      memo: "",
      subDomain: [
        { url: "/list", label: "주소" },
        { url: "/search", label: "검색" },
      ],
    },
    {
      id: "12cdsdsadadsd",
      name: "Medium",
      description:
        "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
      watchList: 100,
      comments: 20,
      memo: "",
      subDomain: [],
    },
    // 더 많은 사이트를 여기에 추가할 수 있습니다.
  ]);
  const total = 2;

  return (
    <div className="mb-[70px] space-y-8">
      {sites.map((site: any, index: number) => (
        <MainCard
          readonly={false}
          key={index}
          site={site}
          isFirst={index === 0}
          isLast={total === index + 1}
          hasMore={false}
        />
      ))}
    </div>
  );
}
