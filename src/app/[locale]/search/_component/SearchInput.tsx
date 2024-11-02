"use client";
import Row from "@/components/Layout/Row";
import { IconSearch2 } from "@/assets/svg/IconSearch";
import React from "react";
import { useRouter } from "@/i18n/routing";

export function SearchInput() {
  const { push } = useRouter();
  const recentSearches = localStorage.getItem("recent_searches");
  const [inputValue, setInputValue] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parseRecentSearch = JSON.parse(recentSearches ?? "[]");
    const arr = [inputValue, ...parseRecentSearch].slice(0, 10);
    const json = JSON.stringify(arr);
    localStorage.setItem("recent_searches", json);
    push("/search/tag?q=" + inputValue);
  };

  return (
    <form onSubmit={onSubmit}>
      <Row className="relative mb-0 mt-[24px] min-h-[40px] w-full flex-wrap items-center rounded-full border border-gray-400 text-button-secondary-foreground tb:mb-[24px]">
        <IconSearch2 className="mx-[12px] h-[24px] w-[24px]" />
        <input
          type="search"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="body5 flex-1 bg-transparent py-[10px] pr-[20px] focus:outline-none"
        />
      </Row>
    </form>
  );
}
