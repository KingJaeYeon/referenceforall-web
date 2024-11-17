import React, { Suspense } from "react";
import Text from "@/components/Layout/Text";
import SearchInput from "@/app/[locale]/tag/[topic]/_component/SearchInput";
import Row from "@/components/Layout/Row";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations();
  return (
    <>
      <Text
        className={
          "heading1 min-h-[30px] font-medium md:min-h-[52px] md:text-[42px]"
        }
      >
        {t("explore_topics")}
      </Text>
      <Suspense fallback={null}>
        <SearchInput />
      </Suspense>
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
