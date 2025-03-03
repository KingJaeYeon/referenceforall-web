"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Row,Text } from "@/components/layout";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";

export default function RecentSearchList() {
  const recentSearches = localStorage.getItem("recent_searches");
  const { t, i18n } = useTranslation();
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(JSON.parse(recentSearches ?? "[]"));
  }, [recentSearches]);

  const handleDelete = (search: string) => {
    const arr = list.filter((item: string) => item !== search);
    setList(arr);
    localStorage.setItem("recent_searches", JSON.stringify(arr));
  };

  return (
    <ul className="space-y-0">
      {list.length > 0 ? (
        list.map((search: string, index: number) => (
          <Row
            key={index}
            className="items-center justify-between border-b border-gray-200 pb-[8px] pt-[11px] last:border-b-0"
          >
            <Row className="h-[29px] items-center">
              <Link className={"body3 ellipsisLine1"} href={`/${i18n.language}/search/tags?q=${search}`}>
                {search}
              </Link>
            </Row>
            <Button variant="default" size="sm" onClick={() => handleDelete(search)}>
              <X size={24} />
              <span className="sr-only">Delete</span>
            </Button>
          </Row>
        ))
      ) : (
        <Text className={"body3 h-[29px] pt-[11px]"}>{t("no_recent_searches_message")}</Text>
      )}
    </ul>
  );
}
