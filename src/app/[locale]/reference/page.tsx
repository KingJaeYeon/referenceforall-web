import React from "react";
import Text from "@/components/Layout/Text";
import SearchInput from "@/app/[locale]/reference/[topic]/_component/SearchInput";
import Row from "@/components/Layout/Row";
import { Link } from "@/i18n/routing";

export default async function Page() {
  return (
    <>
      <Text
        className={
          "heading1 min-h-[30px] font-medium tb:min-h-[52px] tb:text-[42px]"
        }
      >
        {"Explore topics"}
      </Text>
      <SearchInput />
      <Row className={"body5 items-center justify-center"}>
        <Text className={"text-gray-500"}>Recommended:</Text>
        <Link className={"ml-[12px]"} href={"/reference/react"}>
          React
        </Link>
        <Link className={"ml-[12px]"} href={"/reference/javascript"}>
          Javascript
        </Link>
        <Link className={"ml-[12px]"} href={"/reference/typescript"}>
          Typescript
        </Link>
      </Row>
    </>
  );
}
