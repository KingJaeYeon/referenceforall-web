import ScrollTabs, { Tab } from "@/components/ScrollTabs";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import TabContentCSR from "@/app/[locale]/(auth)/my/lists/_component/TabContentCSR";
import NavContentCSR from "@/app/[locale]/(auth)/my/lists/_component/NavContentCSR";
import Row from "@/components/Layout/Row";
import { CreateNewListModalTrigger } from "@/components/modal/CreateNewListModal";

export default function MyListPage({ library }: { library?: string }) {
  const paths: Tab[] = [
    { url: `/my/lists`, label: "Your lists" },
    { url: `/my/lists/saved`, label: "Saved lists" },
  ];
  return (
    <>
      <Col
        className={
          "mx-0 w-full max-w-[680px] md:mx-[24px] md:mb-[48px] md:mt-[52px]"
        }
      >
        <Row className={"items-center justify-between"}>
          <Text
            className={
              "ellipsisLine1 heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium text-black md:my-0 md:min-h-[52px] md:text-[42px]"
            }
          >
            {"Your library"}
          </Text>
          {library ? null : <CreateNewListModalTrigger />}
        </Row>
        <Col className={"items-center"}>
          <ScrollTabs tabs={paths} />
          <TabContentCSR />
        </Col>
      </Col>
      <Col
        className={
          "ls:flex hidden h-[100dvh] w-full max-w-[320px] border-l border-gray-200"
        }
        style={{
          paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
          paddingRight: "24px",
        }}
      >
        <NavContentCSR />
      </Col>
    </>
  );
}
