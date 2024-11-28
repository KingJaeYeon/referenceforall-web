import Col from "@/components/Layout/Col";
import RecommendedTags from "@/app/[locale]/tag/_component/RecommendedTags";
import Text from "@/components/Layout/Text";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export default async function TagPageHeader() {
  const t = await getTranslations();
  const header = await headers();
  const pathname = header.get("x-pathname");

  return (
    <Col>
      <RecommendedTags />
      <Text
        className={
          "heading1 min-h-[30px] font-medium md:min-h-[52px] md:text-[42px]"
        }
      >
        {t("explore_topics")}
      </Text>
    </Col>
  );
}
