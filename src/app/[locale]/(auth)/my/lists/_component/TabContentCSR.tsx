"use client";
import { notFound } from "next/navigation";
import React from "react";
import { SiteCard } from "@/app/[locale]/search/[subject]/_component/MainCard";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import { Card } from "@/components/ui/card";
import { Globe, LockIcon, MoreHorizontal, Settings } from "lucide-react";
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
    <div className="flex h-[150px] w-full max-w-[680px] overflow-hidden rounded-xl bg-white shadow-md">
      {/* 이미지 영역 */}
      <div className="h-full w-1/3">
        {thumbnails && thumbnails.length > 0 ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${thumbnails[0]})`,
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex w-2/3 flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="mb-1 text-sm text-gray-500">{ownerNickname}</p>
              <h2 className="truncate text-lg font-bold text-gray-800">
                {title}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:bg-gray-100"
            >
              <MoreHorizontal size={20} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {isPrivate ? <LockIcon size={16} /> : <Globe size={16} />}
            <span>{bookmarkCount}개의 북마크</span>
          </div>
        </div>
      </div>
    </div>
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
