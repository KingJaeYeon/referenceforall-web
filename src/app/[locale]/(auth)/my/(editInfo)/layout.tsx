import { Col, ContentWrapper, PageWrapper, Row } from "@/components/layout";
import React, { ReactNode } from "react";
import ScrollTabs from "@/components/ScrollTabs";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <PageWrapper>
      <ContentWrapper>
        <Row className={"w-full justify-center"}>
          <Col className={"w-full max-w-[800px] items-center py-8"}>
            <ScrollTabs
              tabs={[
                { url: `/${locale}/my/detail`, label: "My Profile" },
                { url: `/${locale}/my/setting`, label: "Setting" },
              ]}
              className={'mb-[20px] md:mb-[20px]'}
            />
            {children}
          </Col>
        </Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
