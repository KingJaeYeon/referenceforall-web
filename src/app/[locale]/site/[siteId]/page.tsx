import SitePage from "@/app/[locale]/site/[siteId]/_component/SitePage";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";

interface PageProps {
  params: Promise<{ siteId: string; locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const p = await params;
  const siteId = decodeURI(p.siteId);

  // 사이트 가져오는 로직

  // if (!siteId) {
  //   notFound();
  // }

  return {
    title: "Site Details - " + siteId,
    description: "Site Details  - " + siteId,
  };
}

export default function SiteDetailsPage() {
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
    <PageWrapper>
      <ContentWrapper>
        <SitePage siteData={siteData} comments={comments} />
      </ContentWrapper>
    </PageWrapper>
  );
}
