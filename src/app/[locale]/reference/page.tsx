import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Col from "@/components/Layout/Col";
import RecommendTopicList from "@/app/[locale]/reference/_component/RecommendTopicList";
import { ContentHeader } from "@/app/[locale]/reference/_component/ContentHeader";

export default function Page() {
  return (
    <Main>
      <Contents>
        <Col className={"text-center"}>
          <RecommendTopicList />
          <ContentHeader />
        </Col>
      </Contents>
    </Main>
  );
}
