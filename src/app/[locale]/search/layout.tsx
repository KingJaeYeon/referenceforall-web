import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import { Viewport } from "next";
import Row from "@/components/Layout/Row";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Row className={"w-full justify-evenly"}>{children}</Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
