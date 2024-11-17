import Row from "@/components/Layout/Row";
import TopicButton from "@/components/TopicButton";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  ExternalLink,
  Eye,
  MessageSquare,
  Share2,
  Star,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Col from "@/components/Layout/Col";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DesktopComment,
  MobileComment,
} from "@/app/[locale]/site/[siteId]/_component/Comment";

export function DesktopMain(props: {
  siteData: any;
  setIsBookmarked: any;
  isBookmarked: any;
  comments: any;
}) {
  const { siteData, setIsBookmarked, isBookmarked, comments } = props;
  return (
    <div className="mx-auto max-w-full space-y-8 p-6">
      {/* 헤더 */}
      <Row className="items-start justify-between">
        <div>
          <h1 className="heading1 mb-3 text-3xl">{siteData.name}</h1>
          <Row className="flex-wrap gap-2">
            {siteData.tags.map((tag: string) => (
              <TopicButton
                href={`/tag/${tag}`}
                lastPath={tag}
                key={tag}
                className={"mr-0 h-fit px-2 py-[0.5px] md:mr-0"}
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
              {
                icon: Bookmark,
                label: "북마크",
                value: siteData.watchList,
              },
              {
                icon: MessageSquare,
                label: "댓글",
                value: siteData.comments,
              },
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
                  {siteData.usageTiming.map((timing: string) => (
                    <li key={timing}>{timing}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="features">
                <ul className="grid grid-cols-2 gap-4">
                  {siteData.features.map((feature: string) => (
                    <li key={feature} className="body3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="screenshots">
                <div className="grid grid-cols-2 gap-4">
                  {siteData.screenshots.map(
                    (screenshot: string, index: number) => (
                      <img
                        key={index}
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full rounded-lg"
                      />
                    ),
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* 오른쪽 컬럼 - 댓글 */}
        <div className="col-span-4">
          <div className="sticky top-6">
            <DesktopComment comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileMain(props: {
  siteData: any;
  setIsBookmarked: any;
  isBookmarked: any;
  comments: any;
}) {
  const { siteData, setIsBookmarked, isBookmarked, comments } = props;
  return (
    <div className="mx-auto max-w-full">
      {/* 페이지 타이틀 & 액션 버튼 */}
      <div className="mb-4 space-y-4">
        <h1 className="text-2xl font-bold">{siteData.name}</h1>
        <Row className="flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark
              className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
            {isBookmarked ? "북마크됨" : "북마크"}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            공유
          </Button>
          <Button size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            방문하기
          </Button>
        </Row>
      </div>

      {/* 태그 스크롤 */}
      <div className="mb-1 overflow-x-auto">
        <Row className="flex-nowrap gap-2 pb-2">
          {siteData.tags.map((tag: string) => (
            <TopicButton
              href={`/tag/${tag}`}
              lastPath={tag}
              key={tag}
              className="mr-1 h-fit whitespace-nowrap px-2 py-1"
              font="body7"
            >
              {tag}
            </TopicButton>
          ))}
        </Row>
      </div>

      <Separator className="mb-4" />

      {/* 커버 이미지 */}
      <div className="mb-4">
        <img
          src={siteData.imageUrl}
          alt={siteData.name}
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>

      {/* 통계 그리드 */}
      <div className="mb-4 grid grid-cols-2 gap-4">
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
          <Row key={i} className="items-center gap-2 rounded-lg bg-gray-50 p-3">
            <stat.icon className={`h-4 w-4 ${stat.color || ""}`} />
            <Col className="gap-[2px]">
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-sm font-semibold">{stat.value}</div>
            </Col>
          </Row>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <Tabs defaultValue="about" className="mb-6">
        <TabsList className="mb-2 grid w-full grid-cols-4">
          <TabsTrigger value="about" className="text-xs">
            소개
          </TabsTrigger>
          <TabsTrigger value="usage" className="text-xs">
            사용
          </TabsTrigger>
          <TabsTrigger value="features" className="text-xs">
            기능
          </TabsTrigger>
          <TabsTrigger value="screenshots" className="text-xs">
            스크린샷
          </TabsTrigger>
        </TabsList>

        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
          <TabsContent value="about" className="m-0">
            <p className="text-sm leading-relaxed text-gray-700">
              {siteData.description}
            </p>
          </TabsContent>

          <TabsContent value="usage" className="m-0">
            <ul className="space-y-2 text-sm text-gray-700">
              {siteData.usageTiming.map((timing: string) => (
                <li key={timing} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {timing}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="features" className="m-0">
            <ul className="grid gap-2">
              {siteData.features.map((feature: string) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="screenshots" className="m-0">
            <div className="space-y-4">
              {siteData.screenshots.map((screenshot: string, index: number) => (
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

      {/* 댓글 섹션 */}
      <MobileComment comments={comments} />
    </div>
  );
}
