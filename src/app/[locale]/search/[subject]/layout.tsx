import React from "react";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import { Viewport } from "next";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1.0,
  userScalable: false,
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Contents>
        <Row className={"w-full justify-evenly"}>
          {children}
          <Col
            className={
              "hidden h-[100dvh] w-full max-w-[368px] border-l border-gray-200 lg:flex"
            }
            style={{
              paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
              paddingRight: "24px",
            }}
          >
            <Col className={"mb-[30px] mt-[40px]"}>
              <Text className={"heading4 pb-[20px] font-semibold"}>
                Topics matching react
              </Text>
            </Col>
          </Col>
        </Row>
      </Contents>
    </Main>
  );
}
