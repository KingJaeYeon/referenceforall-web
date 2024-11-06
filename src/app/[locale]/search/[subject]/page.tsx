import { redirect } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import React from "react";
import ScrollTabs from "@/app/[locale]/search/[subject]/_component/ScrollTabs";
import { notFound } from "next/navigation";
import TopicButton from "@/components/TopicButton";
import Row from "@/components/Layout/Row";
import { IconDropDownDown } from "@/assets/svg";

export const revalidate = 15;

export function generateStaticParams() {
  return ["sites", "tags"].map((subject) => ({ subject }));
}

interface PageProps {
  params: { subject: string; locale: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Page({
  params,
  searchParams: _searchParams,
}: PageProps) {
  const subject = decodeURI(params.subject);
  const searchParams = await _searchParams;

  const paths = [
    {
      url: `/search/sites`,
      label: "Sites",
    },
    {
      url: `/search/tags`,
      label: "Tags",
    },
  ];

  const isPath = paths.find((path) => path.url === `/search/${subject}`);

  if (!isPath) {
    return notFound();
  }

  if (!searchParams.q) {
    return redirect({ href: "/search", locale: params.locale });
  }

  const search = decodeURI(searchParams.q);

  let data;
  if (subject === "tags") {
    data = [
      { id: 1, value: "react", count: 100 },
      { id: 2, value: "javascript", count: 100 },
      { id: 3, value: "typescript", count: 100 },
      { id: 4, value: "nodejs", count: 100 },
      { id: 5, value: "python", count: 100 },
      { id: 6, value: "machine-learning", count: 100 },
      { id: 7, value: "data-science", count: 100 },
      { id: 8, value: "artificial-intelligence", count: 100 },
      { id: 9, value: "web-development", count: 100 },
      { id: 10, value: "mobile-development", count: 100 },
      { id: 11, value: "cloud-computing", count: 100 },
      { id: 12, value: "devOps", count: 100 },
      { id: 13, value: "blockchain", count: 100 },
      { id: 14, value: "cybersecurity", count: 100 },
      { id: 15, value: "ux-ui-design", count: 100 },
      { id: 16, value: "react-native-development", count: 100 },
      { id: 17, value: "react-components", count: 100 },
      { id: 18, value: "react-query", count: 100 },
      { id: 19, value: "react-forms", count: 100 },
      { id: 20, value: "react-spring", count: 100 },
      { id: 20, value: "mobile-development", count: 100 },
      { id: 21, value: "cloud-computing", count: 100 },
      { id: 22, value: "devOps", count: 100 },
      { id: 23, value: "blockchain", count: 100 },
      { id: 24, value: "cybersecurity", count: 100 },
      { id: 25, value: "ux-ui-design", count: 100 },
      { id: 26, value: "react-native-development", count: 100 },
      { id: 27, value: "react-components", count: 100 },
      { id: 28, value: "react-query", count: 100 },
      { id: 29, value: "react-forms", count: 100 },
      { id: 30, value: "react-spring", count: 100 },
    ];
  } else {
    data = "site";
  }

  return (
    <Row className={"w-full justify-evenly"}>
      <Col
        className={
          "mx-0 w-full max-w-[728px] tb:mx-[24px] tb:mb-[48px] tb:mt-[52px]"
        }
      >
        <Col className={"flex flex-col-reverse tb:flex-col"}>
          <Text
            className={
              "ellipsisLine1 heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium text-gray-400 tb:my-0 tb:min-h-[52px] tb:text-[42px]"
            }
          >
            {"Results for "}
            <span className={"text-black"}>{search}</span>
          </Text>
          <SearchInput subject={subject} />
        </Col>
        <Col>
          <ScrollTabs query={search} tabs={paths} />
          <TabContent target={subject} data={data} />
        </Col>
      </Col>
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
  );
}

function TabContent({ target, data }: { target: string; data: any }) {
  switch (target) {
    case "tags":
      return (
        <div className={"relative"}>
          {data.map((topic: any) => {
            const { id, value, count } = topic;
            return (
              <TopicButton
                key={id}
                href={`/reference/${value}`}
                lastPath={value}
                className={"mb-[8px] mr-[18px] tb:mr-[18px]"}
              >
                {topic.value}
              </TopicButton>
            );
          })}
          <Row
            className={
              "show-more-x absolute bottom-0 h-[46px] w-full items-end justify-center gap-[4px]"
            }
          >
            <Text className={"body2 flex h-fit cursor-pointer items-center"}>
              Show more
            </Text>
            <IconDropDownDown
              className={"relative h-[18px] w-[18px] cursor-pointer"}
            />
          </Row>
        </div>
      );
    case "sites":
      return <div>site</div>;
  }
}
