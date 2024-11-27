import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import Row from "@/components/Layout/Row";
import { ReactNode } from "react";
import type { Metadata } from "next";
import ListsHeader from "@/app/[locale]/(auth)/my/lists/_component/ListsHeader";

// cashing 15m

export const metadata: Metadata = {
  title: "Watch your Library",
  description: "Watch your Library",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Row className={"w-full justify-evenly"}>
          <ListsHeader />
          {children}
        </Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
