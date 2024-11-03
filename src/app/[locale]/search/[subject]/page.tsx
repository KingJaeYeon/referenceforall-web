import { redirect } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import React from "react";
import ScrollTabs from "@/app/[locale]/search/[subject]/_component/ScrollTabs";
import { notFound } from "next/navigation";

export const revalidate = false;

export default async function Page({
  params: _params,
  searchParams: _searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await _params;
  const subject = decodeURI(params.subject);
  const searchParams = await _searchParams;

  const paths = [
    {
      url: `/search/sites`,
      label: "Sites",
    },
    {
      url: `/search/tags`,
      label: "Tags",
    },
  ];

  const isPath = paths.find((path) => path.url === `/search/${subject}`);

  if (!isPath) {
    return notFound();
  }

  if (!searchParams.q) {
    return redirect("/search");
  }

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
      <ScrollTabs query={search} tabs={paths} />
    </Col>
  );
}
