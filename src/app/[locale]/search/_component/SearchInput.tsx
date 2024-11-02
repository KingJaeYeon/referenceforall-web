"use client";
import Row from "@/components/Layout/Row";
import { IconSearch2 } from "@/assets/svg/IconSearch";
import React, { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

export function SearchInput() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const recentSearches = localStorage.getItem("recent_searches");
  const [value, setValue] = React.useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !value.trim()) return;
    const parseRecentSearch = JSON.parse(recentSearches ?? "[]");
    const arr = Array.from(new Set([value.trim(), ...parseRecentSearch])).slice(
      0,
      10,
    );
    const json = JSON.stringify(arr);
    localStorage.setItem("recent_searches", json);
    push("/search/tag?q=" + value);
  };

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setValue(query);
    }
  }, [searchParams]);

  return (
    <form onSubmit={onSubmit}>
      <Row className="relative mb-0 mt-[24px] min-h-[40px] w-full flex-wrap items-center rounded-full border border-gray-400 text-button-secondary-foreground tb:mb-[24px]">
        <IconSearch2 className="mx-[12px] h-[24px] w-[24px]" />
        <input
          type="search"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="body5 flex-1 bg-transparent py-[10px] pr-[20px] focus:outline-none"
        />
      </Row>
    </form>
  );
}
