import Row from "@/components/Layout/Row";
import Text from "@/components/Layout/Text";
import { CreateNewListModalTrigger } from "@/components/modal/CreateNewListModal";
import Col from "@/components/Layout/Col";
import ScrollTabs, { Tab } from "@/components/ScrollTabs";
import TabContentCSR from "@/app/[locale]/(auth)/my/lists/_component/TabContentCSR";

export default function ListsHeader() {
  const paths: Tab[] = [
    { url: `/my/lists`, label: "Your lists" },
    { url: `/my/lists/saved`, label: "Saved lists" },
  ];
  return (
    <Col
      className={
        "mx-0 w-full max-w-[680px] md:mx-[24px] md:mb-[48px] md:mt-[52px]"
      }
    >
      <Row
        className={
          "mb-[6px] mt-[24px] h-[42px] items-center justify-between md:my-0"
        }
      >
        <Text
          className={
            "ellipsisLine1 heading1 min-h-[30px] font-medium text-black md:min-h-[52px] md:text-[42px]"
          }
        >
          {"Your library"}
        </Text>
        <CreateNewListModalTrigger />
      </Row>
      <Col className={"items-center"}>
        <ScrollTabs tabs={paths} />
        <TabContentCSR />
      </Col>
    </Col>
  );
}
