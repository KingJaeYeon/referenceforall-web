"use client";
import { notFound } from "next/navigation";
import React from "react";
import { SiteCard } from "@/app/[locale]/search/[subject]/_component/MainCard";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import { Card } from "@/components/ui/card";
import { Globe, LockIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TabContentCSR() {
  const pathName = usePathname();
  const target = pathName.split("/").pop();
  switch (target) {
    case "lists":
      return <MyLibrary data={{}} />;
    case "saved":
      return <SitesContent data={{}} />;
    default:
      return notFound();
  }
}

function MyLibrary({ data }: { data: any }) {
  const t = useTranslations();
  return <BookmarkList />;
}

function SitesContent({ data }: { data: any }) {
  return null;
  const { sites, total } = data;

  return sites?.map((site: any, index: any) => (
    <SiteCard
      key={index}
      site={site}
      isFirst={index === 0}
      isLast={total === index + 1}
      hasMore={total === index + 1}
    />
  ));
}

const BookmarkListCard = ({
  title,
  ownerNickname,
  bookmarkCount,
  isPrivate,
  thumbnails,
}: any) => {
  return (
    <Card className="flex h-[180px] max-w-[680px] rounded-sm p-4">
      <Col className={"flex-1 justify-between"}>
        {/* 소유자 및 타이틀 영역 */}
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              {ownerNickname}
            </p>
            <h2 className="truncate text-lg font-bold">{title}</h2>
            {/* 추가 설명 또는 태그 영역 */}
            <div className="mt-[20px] text-sm text-muted-foreground">
              추가 설명이나 태그를 여기에 표시할 수 있습니다.
            </div>
          </div>
        </div>

        {/* 북마크 정보 */}
        <div className="flex w-full flex-col justify-between pr-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {isPrivate ? <LockIcon size={16} /> : <Globe size={16} />}
              <span>{bookmarkCount}개의 북마크</span>
            </div>

            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </Col>
      {/* 이미지 영역 */}
      <div className="relative h-full w-1/3">
        {thumbnails && thumbnails.length > 0 ? (
          <>
            <div
              className="absolute left-0 top-0 z-10 h-[70%] w-[70%] rounded-md bg-cover bg-center shadow-md"
              style={{
                backgroundImage: `url(${thumbnails[0]})`,
                transform: "rotate(-5deg)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 h-[70%] w-[70%] rounded-md bg-cover bg-center shadow-md"
              style={{
                backgroundImage: `url(${thumbnails[1] || thumbnails[0]})`,
                transform: "rotate(5deg)",
              }}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-muted-foreground">
            이미지 없음
          </div>
        )}
      </div>
    </Card>
  );
};

export function BookmarkList() {
  const TEMP_BOOKMARK_LISTS = [
    {
      id: 1,
      title: "여행 추천 스팟",
      ownerNickname: "트래블러",
      bookmarkCount: 15,
      isPrivate: false,
      thumbnails: [
        "/placeholder.svg?height=400&width=800",
        "/placeholder.svg?height=400&width=800",
        "/placeholder.svg?height=400&width=800",
      ],
    },
  ];

  return TEMP_BOOKMARK_LISTS.map((list) => (
    <BookmarkListCard
      key={list.id}
      title={list.title}
      ownerNickname={list.ownerNickname}
      bookmarkCount={list.bookmarkCount}
      isPrivate={list.isPrivate}
      thumbnails={list.thumbnails}
    />
  ));
}
