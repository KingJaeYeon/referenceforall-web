import React from "react";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import ScrollTabs, { Tab } from "@/components/ScrollTabs";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const paths: Tab[] = [
    { url: `/my/lists`, label: "Your lists" },
    { url: `/my/lists/saved`, label: "Saved lists" },
  ];

  return (
    <Main>
      <Contents>
        <Row className={"w-full justify-evenly"}>
          <Col
            className={
              "mx-0 w-full max-w-[728px] md:mx-[24px] md:mb-[48px] md:mt-[52px]"
            }
          >
            <Col className={"flex flex-col-reverse md:flex-col"}>
              <Text
                className={
                  "ellipsisLine1 heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium text-black md:my-0 md:min-h-[52px] md:text-[42px]"
                }
              >
                {"Your library"}
              </Text>
            </Col>
            <Col>
              <ScrollTabs tabs={paths} />
              {/*<TabContent target={subject} data={data?.main} />*/}
            </Col>
          </Col>
          {children}
        </Row>
      </Contents>
    </Main>
  );
}
