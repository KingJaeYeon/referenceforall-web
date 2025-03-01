"use client";
import { Row } from "@/components/layout";
import { IconSearch2 } from "@/assets/svg";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

export function SearchInput({ subject }: { subject?: string }) {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const recentSearches = localStorage.getItem("recent_searches");
  const [value, setValue] = useState(() => searchParams.get("q") ?? "");
  const { i18n } = useTranslation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !value.trim()) {
      return push(`/${i18n.language}/search`);
    }
    const parseRecentSearch = JSON.parse(recentSearches ?? "[]");
    const arr = Array.from(new Set([value.trim(), ...parseRecentSearch])).slice(0, 10);
    const json = JSON.stringify(arr);
    localStorage.setItem("recent_searches", json);
    push(`/${i18n.language}/search/${subject}?q=` + value);
  };

  return (
    <form onSubmit={onSubmit}>
      <Row className="relative mb-0 mt-[8px] min-h-[40px] w-full flex-wrap items-center rounded-full border border-gray-300 text-button-secondary-foreground md:mb-[24px] md:mt-[24px]">
        <IconSearch2 className="mx-[9px] h-[18px] w-[18px] md:mx-[12px] md:h-[24px] md:w-[24px]" />
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
