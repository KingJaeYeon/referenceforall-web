"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ExternalLink,
  Eye,
  MessageSquare,
  Share2,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TopicButton from "@/components/TopicButton";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";

export default function Component() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const siteData = {
    name: "Medium",
    description:
      "Medium은 전세계의 작가, 전문가, 독자들이 모여 다양한 주제에 대해 이야기를 나누는 플랫폼입니다. 기술, 문화, 사회 등 폭넓은 주제의 고품질 콘텐츠를 만나보세요.",
    url: "https://medium.com",
    imageUrl: "/placeholder.svg?height=400&width=800",
    tags: ["블로그", "기술", "문화", "커뮤니티", "지식공유", "미디어"],
    rating: 4.5,
    visitors: "1.2K",
    watchList: 100,
    comments: 20,
    usageTiming: ["글쓰기", "기술 트렌드 파악", "지식 공유"],
    features: ["글쓰기", "팔로우", "클래핑", "뉴스레터"],
    screenshots: [
      "/placeholder.svg?height=400&width=800",
      "/placeholder.svg?height=400&width=800",
    ],
  };

  return (
    <div className="mx-auto max-w-full space-y-8 p-6">
      {/* 헤더 */}
      <Row className="items-start justify-between">
        <div>
          <h1 className="heading1 mb-3 text-3xl">{siteData.name}</h1>
          <Row className="flex-wrap gap-2">
            {siteData.tags.map((tag) => (
              <TopicButton
                href={`/tag/${tag}`}
                lastPath={tag}
                key={tag}
                className={"mr-0 h-fit px-2 py-[0.5px] tb:mr-0"}
                font={"body7"}
              >
                {tag}
              </TopicButton>
            ))}
          </Row>
        </div>
        <Row className="gap-2">
          <Button
            variant="outline"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
            {isBookmarked ? "북마크됨" : "북마크"}
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            방문하기
          </Button>
        </Row>
      </Row>

      <Separator />

      {/* 메인 콘텐츠 */}
      <div className="grid grid-cols-12 gap-8">
        {/* 왼쪽 컬럼 */}
        <div className="col-span-8 space-y-8">
          {/* 커버 이미지 */}
          <img
            src={siteData.imageUrl}
            alt={siteData.name}
            className="aspect-video w-full rounded-lg object-cover"
          />

          {/* 통계 */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                icon: Star,
                label: "평점",
                value: `${siteData.rating}/5.0`,
                color: "text-yellow-500",
              },
              { icon: Eye, label: "방문", value: siteData.visitors },
              { icon: Bookmark, label: "북마크", value: siteData.watchList },
              { icon: MessageSquare, label: "댓글", value: siteData.comments },
            ].map((stat, i) => (
              <Row key={i} className="items-center gap-3">
                <stat.icon className={`h-5 w-5 ${stat.color || ""}`} />
                <Col className={"gap-[2px]"}>
                  <div className="body5 text-gray-500">{stat.label}</div>
                  <div className="heading4 font-semibold">{stat.value}</div>
                </Col>
              </Row>
            ))}
          </div>

          <Separator />

          {/* 탭 콘텐츠 */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="about" className="flex-1">
                소개
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex-1">
                사용 시나리오
              </TabsTrigger>
              <TabsTrigger value="features" className="flex-1">
                주요 기능
              </TabsTrigger>
              <TabsTrigger value="screenshots" className="flex-1">
                스크린샷
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-4">
              <TabsContent value="about">
                <p className={"body3"}>{siteData.description}</p>
              </TabsContent>

              <TabsContent value="usage">
                <ul className="body3 list-disc space-y-2 pl-5">
                  {siteData.usageTiming.map((timing) => (
                    <li key={timing}>{timing}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="features">
                <ul className="grid grid-cols-2 gap-4">
                  {siteData.features.map((feature) => (
                    <li key={feature} className="body3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="screenshots">
                <div className="grid grid-cols-2 gap-4">
                  {siteData.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full rounded-lg"
                    />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* 오른쪽 컬럼 - 댓글 */}
        <div className="col-span-4">
          <div className="sticky top-6">
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
}

const CommentSection = () => {
  const comments = [
    {
      id: 1,
      author: "홍길동",
      // avatar: "/placeholder.svg?height=40&width=40",
      avatar: "https://github.com/shadcn.png",
      content:
        "매일 사용하는 유용한 사이트입니다. 특히 기술 블로그 섹션이 좋아요.",
      date: "2024-03-15",
      likes: 5,
      dislikes: 1,
    },
    {
      id: 2,
      author: "김철수",
      // avatar: "/placeholder.svg?height=40&width=40",
      avatar: "https://github.com/shadcn.png",
      content: "UI가 깔끔하고 사용하기 편리합니다.",
      date: "2024-03-14",
      likes: 3,
      dislikes: 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">댓글</h3>
        <select className="rounded-md border px-2 py-1 text-sm">
          <option>최신순</option>
          <option>추천순</option>
        </select>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full rounded-lg border p-2 text-sm"
          placeholder="이 사이트에 대한 의견을 공유해주세요..."
          rows={3}
        />
        <Button size="sm">작성</Button>
      </div>

      <Separator />

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            <Row className="gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={comment.author}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Row className="items-baseline justify-between">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </Row>
                <p className="mt-1 text-sm">{comment.content}</p>
                <Row className="mt-2 gap-3">
                  <Button variant="ghost" size="sm" className="h-6">
                    <ThumbsUp className="mr-1 h-3 w-3" />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6">
                    <ThumbsDown className="mr-1 h-3 w-3" />
                    <span className="text-xs">{comment.dislikes}</span>
                  </Button>
                </Row>
              </div>
            </Row>
            {comments.indexOf(comment) !== comments.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};
