"use client";

import Col from "@/components/Layout/Col";
import RecommendTopicList from "@/app/[locale]/reference/_component/RecommendTopicList";
import { Header } from "@/app/[locale]/reference/_component/Header";
import Row from "@/components/Layout/Row";

export default function ReferencePage() {
  return (
    <Col className={"text-center"}>
      <RecommendTopicList />
      <Header />
      <Body />
    </Col>
  );
}

function Body() {
  return <Row className={"mt-[40px] text-center"}>Body</Row>;
}
