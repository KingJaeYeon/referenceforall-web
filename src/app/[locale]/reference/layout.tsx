import React from "react";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import RecommendTopicList from "@/app/[locale]/reference/[topic]/_component/RecommendTopicList";
import Col from "@/components/Layout/Col";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Contents>
        <Col className={"text-center"}>
          <RecommendTopicList />
          {children}
        </Col>
      </Contents>
    </Main>
  );
}
