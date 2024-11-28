"use client";
import { notFound } from "next/navigation";
import React from "react";
import { SiteCard } from "@/app/[locale]/search/[subject]/_component/MainCard";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import { Card } from "@/components/ui/card";
import { LucideLock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Row from "@/components/Layout/Row";
import { cn } from "@/lib/utils";
import Text from "@/components/Layout/Text";

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

const BookmarkPreviewCard = ({
  title,
  author,
  bookmarkCount,
  isPrivate,
  bookmarkPreviews,
}: any) => {
  // 이미지 미리보기 최대 3개로 제한
  const previews = bookmarkPreviews.slice(0, 3);
  const hasMorePreviews = bookmarkPreviews.length > 3;

  return (
    <Card className="mb-10 overflow-hidden rounded-sm border border-gray-50 bg-gray-50 transition-all hover:shadow-lg">
      <Col className="flex-col-reverse sm:h-[145px] sm:flex-row">
        {/* 컨텐츠 섹션 */}
        <Col className="min-h-[105px] flex-1 justify-between p-4 pb-3 sm:h-full sm:p-6">
          {/* 데스크탑 헤더 */}
          <Text className="body5 min-h-[20px] text-gray-500">{author}</Text>
          <h3 className="heading4 ellipsisLine2 mt-2 line-clamp-2 max-h-[40px] min-h-[20px]">
            {title}
          </h3>
          {/* 데스크탑 하단 정보 */}
          <Row className={"justify-between"}>
            <Row className="body6 items-center gap-[6px] text-gray-500">
              <span>{bookmarkCount} items</span>
              {isPrivate && <LucideLock className="h-3 w-3" />}
            </Row>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </Row>
        </Col>

        {/* 데스크탑 이미지 프리뷰 섹션 */}
        <Row className="relative h-[125px] w-full gap-[2px] overflow-hidden sm:h-full sm:w-[45%]">
          <div
            className={cn(
              `h-full w-[45%] bg-cover bg-center sm:w-[60%]`,
              previews[0]?.thumbnail ? "" : "bg-gray-100",
            )}
            style={
              previews[0]?.thumbnail
                ? { backgroundImage: `url(${previews[0].thumbnail})` }
                : {}
            }
          />
          <Row className="w-[55%] gap-[2px] sm:w-[40%] sm:flex-col">
            {[0, 1].map((_, index) => (
              <div
                key={index}
                className={cn(
                  `h-full bg-cover bg-center sm:h-1/2 sm:w-full`,
                  previews[index + 1]?.thumbnail ? "" : "bg-gray-100",
                  index === 0 ? "w-[65%]" : "w-[35%]",
                )}
                style={
                  previews[index + 1]?.thumbnail
                    ? {
                        backgroundImage: `url(${previews[index + 1].thumbnail})`,
                      }
                    : {}
                }
              />
            ))}
          </Row>
        </Row>
      </Col>
    </Card>
  );
};

const BookmarkList = () => {
  const bookmarks = [
    {
      id: 1,
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 24,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731586030995-a131d90a5d04?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731951338443-360860e13f51?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 2,
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: true,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 3,
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [],
    },
    {
      id: 4,
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
  ];

  return (
    <div className="mb-[60px] w-full">
      {bookmarks.map((bookmark) => (
        <BookmarkPreviewCard key={bookmark.id} {...bookmark} />
      ))}
    </div>
  );
};
