"use client";
import Col from "@/components/Layout/Col";
import RecommendedTags from "@/app/[locale]/tag/_component/RecommendedTags";
import Text from "@/components/Layout/Text";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";

export default function TagPageHeader() {
  const t = useTranslations();
  const pathname = usePathname();
  const topic = pathname.split("/")[2];
  const recommendTopics = [
    "technology",
    "blockchain",
    "artificial-intelligence",
    "programming",
    "machine-learning",
    "data-science",
    "defi",
    "tech",
    "crypto",
    "business2",
    "business1",
    "business3",
  ];

  return (
    <Col className={"flex-col-reverse md:flex-col"}>
      <RecommendedTags tags={recommendTopics} />
      <Text
        className={
          "ellipsisLine1 heading1 mb-[20px] mt-[24px] min-h-[30px] text-left font-medium capitalize md:my-0 md:min-h-[52px] md:text-center md:text-[42px]"
        }
      >
        {topic ? topic.split("-").join(" ") : t("explore_topics")}
      </Text>
    </Col>
  );
}
