"use client";

import { Card } from "@/components/ui/card";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Bookmark, LucideLock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function BookmarkPreviewCard({
  id,
  title,
  authorId,
  author,
  bookmarkCount,
  isPrivate,
  bookmarkPreviews,
}: any) {
  // 이미지 미리보기 최대 3개로 제한
  const previews = bookmarkPreviews.slice(0, 3);
  const hasMorePreviews = bookmarkPreviews.length > 3;
  const myUserId = "a";
  const { push } = useRouter();
  return (
    <Card
      className="mb-10 overflow-hidden rounded-sm border border-gray-50 bg-gray-50 transition-all hover:shadow-lg"
      onClick={() => push(`/@${author}/list/${title.split(" ").join("-")}`)}
    >
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
            <Row className={"gap-[6px]"}>
              {authorId !== myUserId && (
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Bookmark className="h-5 w-5" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </Row>
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
}
