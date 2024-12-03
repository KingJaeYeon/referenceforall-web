"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import {
  BookmarkIcon,
  Star,
  Calendar,
  MessageSquare,
  Hash,
} from "lucide-react";
import Row from "@/components/Layout/Row";

type Site = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  commentCount: number;
  tags: string[];
  bookmarkCount: number;
  rating: number;
  memo: string;
  domain: string;
  subdomain: string;
};

export function SiteCard({ bookmarkId }: { bookmarkId: string }) {
  const [sites, setSites] = useState<Site[]>([
    {
      id: 1,
      title: "예시 사이트",
      description: "이것은 예시 사이트입니다.",
      imageUrl: "/placeholder.svg",
      createdAt: "2023-06-01",
      commentCount: 5,
      tags: ["웹", "개발", "디자인"],
      bookmarkCount: 10,
      rating: 4.5,
      memo: "좋은 사이트입니다.",
      domain: "example.com",
      subdomain: "example",
    },
    // 더 많은 사이트를 여기에 추가할 수 있습니다.
  ]);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onChangeMemo = (id: any, value: any) => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
    updateMemo(id, value);
  };

  const toggleBookmark = (siteId: number) => {
    setSites(
      sites.map((site) =>
        site.id === siteId
          ? {
              ...site,
              bookmarkCount:
                site.bookmarkCount + (site.bookmarkCount % 2 === 0 ? 1 : -1),
            }
          : site,
      ),
    );
  };

  const updateMemo = (siteId: number, memo: string) => {
    setSites(
      sites.map((site) => (site.id === siteId ? { ...site, memo } : site)),
    );
  };

  const updateSubdomain = (siteId: number, subdomain: string) => {
    setSites(
      sites.map((site) => (site.id === siteId ? { ...site, subdomain } : site)),
    );
  };

  return (
    <div className="space-y-8">
      {sites.map((site) => (
        <div key={site.id} className="mb-12 last:mb-0">
          <Row className={"mb-6"}>
            <Textarea
              ref={textarea}
              value={site.memo}
              rows={1}
              onChange={(e) => onChangeMemo(site.id, e.target.value)}
              placeholder="메모를 입력하세요..."
              className={"h-[37px] min-h-0 w-full resize-none md:min-h-0"}
            />
            <Row className={"w-[20%]"}>
              <button>Done</button>
              <button>Cancel</button>
            </Row>
          </Row>
          <div className="flex items-start gap-4">
            <Image
              src={site.imageUrl}
              alt={site.title}
              width={100}
              height={100}
              className="rounded"
            />
            <div className="flex-grow">
              <h2 className="mb-2 text-2xl font-bold">{site.title}</h2>
              <p className="mb-4 text-gray-600">{site.description}</p>
              <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {site.createdAt}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {site.commentCount}
                </span>
                <span className="flex items-center">
                  <BookmarkIcon className="mr-1 h-4 w-4" />
                  {site.bookmarkCount}
                </span>
                <span className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 stroke-yellow-400" />
                  {site.rating}
                </span>
              </div>
              <div className="mb-4">
                {site.tags.slice(0, 5).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="mr-2">
                    <Hash className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Row className="mt-6 items-center">
            <Input
              type="text"
              value={site.subdomain}
              onChange={(e) => updateSubdomain(site.id, e.target.value)}
              placeholder="서브도메인 입력"
              className="mr-2"
            />
            <span className="text-gray-500">.{site.domain}</span>
          </Row>
        </div>
      ))}
    </div>
  );
}
