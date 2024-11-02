import { redirect } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import RecentSearchList from "@/app/[locale]/search/_component/RecentSearchList";
import React from "react";

export const revalidate = false;

export default async function Page({
  params: _params,
  searchParams: _searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await _params;
  const topic = decodeURI(params.subject);
  const searchParams = await _searchParams;

  if (!searchParams.q) {
    return redirect("/search");
  } else {
    const search = decodeURI(searchParams.q);

    return (
      <Col className={"max-w-[1000px] tb:mb-[48px] tb:mt-[52px]"}>
        <Col className={"flex flex-col-reverse tb:flex-col"}>
          <Text
            className={
              "ellipsisLine1 heading1 mb-[30px] mt-[24px] min-h-[30px] font-medium text-gray-400 tb:my-0 tb:min-h-[52px] tb:text-[42px]"
            }
          >
            {"Results for "}
            <span className={"text-black"}>{search}</span>
          </Text>
          <SearchInput />
        </Col>
        <RecentSearchList />
      </Col>
    );
  }
}
