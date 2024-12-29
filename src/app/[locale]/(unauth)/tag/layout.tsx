import { ReactNode } from "react";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import Col from "@/components/Layout/Col";
import RecommendedTags from "@/app/[locale]/(unauth)/tag/_component/RecommendedTags";

interface PageProps {
  children: ReactNode;
}
export default async function Layout({ children }: PageProps) {
  const recommendTopics = [
    "technology",
    "blockchain",
    "artificial-intelligence",
    "programming",
    "machine-learning",
    "data-science",
    "defi",
    "tech",
    "crypto",
    "business2",
    "business1",
    "business3",
  ];
  return (
    <PageWrapper>
      <ContentWrapper>
        <Col className={"text-center"}>
          <RecommendedTags tags={recommendTopics} />
          {children}
        </Col>
      </ContentWrapper>
    </PageWrapper>
  );
}
