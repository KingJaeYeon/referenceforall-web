"use client";

import Col from "@/components/Layout/Col";
import RecommendTopicList from "@/app/[locale]/reference/_component/RecommendTopicList";
import { Header } from "@/app/[locale]/reference/_component/Header";
import Row from "@/components/Layout/Row";
import { Star, Bookmark, Users, Calendar } from "lucide-react";

export default function ReferencePage() {
  return (
    <Col className={"text-center"}>
      <RecommendTopicList />
      <Header />
      <Body />
    </Col>
  );
}

function Body() {
  return (
    <Row className={"mt-[40px] text-center"}>
      <Row className={"w-full flex-wrap justify-between gap-[40px]"}>
        <Row className={"relative w-[30%] pt-[30.25%]"}>
          <MediumStyleCard />
        </Row>
        <Row className={"relative w-[30%] pt-[30.25%]"}>
          <MediumStyleCard />
        </Row>
        <Row className={"relative w-[30%] pt-[30.25%]"}>
          <MediumStyleCard />
        </Row>
        <Row className={"relative w-[30%] pt-[30.25%]"}>
          <MediumStyleCard />
        </Row>
      </Row>
    </Row>
  );
}

const MediumStyleCard = ({ onClick, isLarge = false }: any) => {
  const site = {
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
    <Col
      className={
        "absolute left-0 top-0 h-full w-full gap-2 border border-red p-4 text-left"
      }
    >
      <div className="relative -mx-4 -mt-4 overflow-hidden">
        <img
          src={site.imageUrl}
          alt={site.name}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-wrap gap-1.5 py-1">
        {site.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
          {site.name}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500">{site.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4 text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{site.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{site.visitors}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{site.lastUpdate}</span>
          </div>
        </div>
        <button
          className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark className="h-4 w-4" />
        </button>
      </div>
    </Col>
  );
};
