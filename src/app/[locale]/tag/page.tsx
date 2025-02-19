import SearchInput from "@/app/[locale]/tag/[topic]/_component/SearchInput";
import { Row,Text } from "@/components/layout";

import type { Metadata } from "next";
import Link from "next/link";
import { getTranslation } from "@/app/i18n";

export const metadata: Metadata = {
  title: "Explore Tag",
  description: "Explore Tag Page",
};

export default async function ExploreTagPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const { t } = await getTranslation(params.locale);
  return (
    <>
      <Text className={"heading1 min-h-[30px] font-medium md:min-h-[52px] md:text-[42px]"}>{t("explore_topics")}</Text>
      <SearchInput />
      <Row className={"body5 items-center justify-center"}>
        <Text className={"text-gray-500"}>{t("recommended")}:</Text>
        <Link className={"ml-[12px]"} href={"/tag/react"}>
          React
        </Link>
        <Link className={"ml-[12px]"} href={"/tag/javascript"}>
          Javascript
        </Link>
        <Link className={"ml-[12px]"} href={"/tag/typescript"}>
          Typescript
        </Link>
      </Row>
    </>
  );
}
