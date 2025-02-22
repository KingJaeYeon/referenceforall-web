"use client";
import { Col } from "@/components/layout";
import Link from "next/link";

export default function Error() {
  return (
    <Col className={'py-5 items-center gap-3'}>
      <h1 className={'heading1'}>500 Server error</h1>
      <Link className={'body1'} href={'/'}>홈으로 가기</Link>
    </Col>
  );
}
