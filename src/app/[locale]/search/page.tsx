import React from "react";
import Text from "@/components/Layout/Text";
import Col from "@/components/Layout/Col";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import RecentSearchList from "@/app/[locale]/search/_component/RecentSearchList";

export default async function Page() {
  return (
    <Col className={"max-w-[1000px] tb:mb-[48px] tb:mt-[52px]"}>
      <Col className={"flex flex-col-reverse tb:flex-col"}>
        <Text
          className={
            "heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium tb:my-0 tb:min-h-[52px] tb:text-[42px]"
          }
        >
          {"Recent searches"}
        </Text>
        <SearchInput />
      </Col>
      <RecentSearchList />
    </Col>
  );
}
