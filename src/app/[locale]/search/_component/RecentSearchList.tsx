"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Row from "@/components/Layout/Row";
import { Link } from "@/i18n/routing";
import Text from "@/components/Layout/Text";

export default function RecentSearchList() {
  const recentSearches = localStorage.getItem("recent_searches");
  const [list, setList] = React.useState<string[]>([]);

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
              <Link
                className={"body3 ellipsisLine1"}
                href={`/search/tags?q=${search}`}
              >
                {search}
              </Link>
            </Row>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleDelete(search)}
            >
              <X size={24} />
              <span className="sr-only">Delete</span>
            </Button>
          </Row>
        ))
      ) : (
        <Text className={"body3 h-[29px] pt-[11px]"}>
          You have no recent searches
        </Text>
      )}
    </ul>
  );
}
