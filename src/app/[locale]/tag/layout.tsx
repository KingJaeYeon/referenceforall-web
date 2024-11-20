import { ReactNode } from "react";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import RecommendTopicList from "@/app/[locale]/tag/[topic]/_component/RecommendTopicList";
import Col from "@/components/Layout/Col";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Col className={"text-center"}>
          <RecommendTopicList />
          {children}
        </Col>
      </ContentWrapper>
    </PageWrapper>
  );
}
