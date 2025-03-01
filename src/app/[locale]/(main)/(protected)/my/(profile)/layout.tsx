import { Col, ContentWrapper, PageWrapper, Row } from "@/components/layout";
import React, { ReactNode, Suspense } from "react";
import ScrollTabs from "@/components/ScrollTabs";
import Loading from "@/app/[locale]/loading";
import Error from "@/app/[locale]/error";
import { ErrorBoundary } from "react-error-boundary";

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
                { url: `/${locale}/my/account`, label: "Account" },
                { url: `/${locale}/my/setting`, label: "Setting" },
              ]}
              className={"mb-[20px] md:mb-[20px]"}
            />
            <Suspense fallback={<Loading />}>
              <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
            </Suspense>
          </Col>
        </Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
