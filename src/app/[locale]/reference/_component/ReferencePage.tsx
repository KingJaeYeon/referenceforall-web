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
  return (
    <Row className={"mt-[40px] text-center"}>
      <Row className={"w-full justify-between"}>
        <Row className={"relative w-[30%] pt-[25.25%]"}>
          <Col
            className={"absolute left-0 top-0 h-full w-full border border-red"}
          ></Col>
        </Row>
        <Row className={"relative w-[30%] pt-[25.25%]"}>
          <Col
            className={"absolute left-0 top-0 h-full w-full border border-red"}
          ></Col>
        </Row>
        <Row className={"relative w-[30%] pt-[25.25%]"}>
          <Col
            className={"absolute left-0 top-0 h-full w-full border border-red"}
          ></Col>
        </Row>
      </Row>
    </Row>
  );
}
