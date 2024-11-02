import React from "react";
import Text from "@/components/Layout/Text";
import SearchInput from "@/components/SearchInput";

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
      <SearchInput/>
    </>
  );
}
