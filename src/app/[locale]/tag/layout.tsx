import { ReactNode } from "react";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import Col from "@/components/Layout/Col";
import TagPageHeader from "@/app/[locale]/tag/_component/TagPageHeader";

interface PageProps {
  children: ReactNode;
}
export default async function Layout({ children }: PageProps) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Col className={"text-center"}>
          <TagPageHeader />
          {children}
        </Col>
      </ContentWrapper>
    </PageWrapper>
  );
}
