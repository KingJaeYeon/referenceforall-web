import { notFound } from "next/navigation";
import ScrollTabs, { Tab } from "@/components/ScrollTabs";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import LibraryHeader from "@/app/[locale]/(auth)/my/lists/[[...library]]/_component/LibraryHeader";
import TabContent from "@/app/[locale]/(auth)/my/lists/[[...library]]/_component/TabContent";
import NavContent from "@/app/[locale]/(auth)/my/lists/[[...library]]/_component/NavContent";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateStaticParams() {
  const allowedPaths = ["", "saved"];
  return allowedPaths.map((path) => ({ library: path }));
}

interface PageProps {
  params: Promise<{ library?: string[] }>;
}

export const metadata: Metadata = {
  title: "Watch your Library",
  description: "Watch your Library",
};

export default async function LibraryPage(props: PageProps) {
  const params = await props.params;
  const library = params.library || [];

  const ALLOWED_URLS = ["saved"];
  const IS_ALLOWED_URL =
    library.length > 1 || (library[0] && !ALLOWED_URLS.includes(library[0]));

  if (IS_ALLOWED_URL) {
    notFound(); // 허용되지 않은 경로는 404로 처리
  }
  const paths: Tab[] = [
    { url: `/my/lists`, label: "Your lists" },
    { url: `/my/lists/saved`, label: "Saved lists" },
  ];

  const libraryPath = library[0] || "root";

  return (
    <PageWrapper>
      <ContentWrapper>
        <Row className={"w-full justify-evenly"}>
          <Col
            className={
              "mx-0 w-full max-w-[680px] md:mx-[24px] md:mb-[48px] md:mt-[52px]"
            }
          >
            <Suspense fallback={<div>Loading...</div>}>
              <LibraryHeader />
              <Col className={"items-center"}>
                <ScrollTabs tabs={paths} />
                <TabContent library={libraryPath} />
              </Col>
            </Suspense>
          </Col>
          <Col
            className={
              "hidden h-auto w-full max-w-[320px] border-l border-gray-200 ls:flex"
            }
            style={{
              paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
              paddingRight: "24px",
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <NavContent library={libraryPath} />
            </Suspense>
          </Col>
        </Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
