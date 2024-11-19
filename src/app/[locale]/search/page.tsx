import Text from "@/components/Layout/Text";
import Col from "@/components/Layout/Col";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import RecentSearchList from "@/app/[locale]/search/_component/RecentSearchList";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Row from "@/components/Layout/Row";

export default async function RecentSearchesPage() {
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
                  "heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium md:my-0 md:min-h-[52px] md:text-[42px]"
                }
              >
                {"Recent searches"}
              </Text>
              <SearchInput />
            </Col>
            <RecentSearchList />
          </Col>
          <Col
            className={
              "hidden h-[100dvh] w-full max-w-[368px] border-l border-gray-200 lg:flex"
            }
            style={{
              paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
              paddingRight: "24px",
            }}
          />
        </Row>
      </Contents>
    </Main>
  );
}
