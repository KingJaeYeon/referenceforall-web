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
  const recommendTopics = [
    "Technology",
    "Blockchain",
    "Artificial Intelligence",
    "Programming",
    "Machine Learning",
    "Data Science",
    "Defi",
    "Tech",
    "Crypto",
    "Business2",
    "Business1",
    "Business3",
  ];
  return (
    <Main>
      <Contents>
        <Col className={"text-center"}>
          <RecommendTopicList recommendTopics={recommendTopics} />
          {children}
        </Col>
      </Contents>
    </Main>
  );
}
