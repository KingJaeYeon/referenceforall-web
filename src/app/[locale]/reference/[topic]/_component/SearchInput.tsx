"use client";
import { Search } from "lucide-react";
import Row from "@/components/Layout/Row";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hook/useDebounce";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "@/i18n/routing";

const searchTopics = async (
  query: string,
): Promise<{ value: string; count: number }[]> => {
  // 실제 구현에서는 이 부분을 백엔드 API 호출로 대체해야 합니다.
  const allTopics = [
    { value: "react", count: 100 },
    { value: "javascript", count: 100 },
    { value: "typescript", count: 100 },
    { value: "nodejs", count: 100 },
    { value: "python", count: 100 },
    { value: "machine-learning", count: 100 },
    { value: "data-science", count: 100 },
    { value: "artificial-intelligence", count: 100 },
    { value: "web-development", count: 100 },
    { value: "mobile-development", count: 100 },
    { value: "cloud-computing", count: 100 },
    { value: "devOps", count: 100 },
    { value: "blockchain", count: 100 },
    { value: "cybersecurity", count: 100 },
    { value: "ux-ui-design", count: 100 },
  ];
  const res = allTopics
    .filter((topic) => topic.value.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return res ?? [];
};

export default function SearchInput() {
  const { push } = useRouter();
  const recentSearches = localStorage.getItem("recent_searches");
  const [commandValue, setCommandValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const debounce = useDebounce(inputValue);

  const { data, isLoading } = useQuery({
    queryFn: () => searchTopics(debounce),
    queryKey: ["searchTopics", debounce],
    enabled: debounce.length >= 2,
  });

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    setCommandValue(e.target.value);
  };

  const handleInputKeyDown = (e: any) => {
    const isEnter = e.key === "Enter";

    if (isEnter) {
      e.preventDefault();
      if (inputValue.trim() === "") return;
      if (commandValue) {
        const parseRecentSearch = JSON.parse(recentSearches ?? "[]");
        const arr = [commandValue, ...parseRecentSearch].slice(0, 10);
        const json = JSON.stringify(arr);
        localStorage.setItem("recent_searches", json);
        return push("/search/tag?p=" + commandValue);
      }
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit} className={"flex w-full justify-center"}>
      <Row className="relative my-[24px] min-h-[40px] w-full flex-wrap items-center rounded-full bg-button-secondary text-button-secondary-foreground tb:min-h-[63px] tb:max-w-[680px]">
        <Search className="mx-[12px] h-[24px] w-[24px] tb:ml-[24px] tb:mr-[16px]" />
        <Row className="flex-1">
          <Command
            className={"bg-transparent"}
            onValueChange={setCommandValue}
            value={commandValue}
          >
            <input
              type="text"
              placeholder={"Search topics"}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="body5 flex-1 bg-transparent py-[10px] pr-[20px] focus:outline-none"
            />
            {!!data && data?.length > 0 && (
              <CommandList
                className={
                  "absolute left-[24px] top-[37px] min-w-[250px] rounded-sm bg-white px-[12px] py-[15px] shadow tb:top-[55px]"
                }
              >
                {data.map((item) => (
                  <CommandItem
                    key={item.value}
                    className={"pr-[20px] capitalize"}
                    value={item.value + "."}
                    onSelect={(currentValue) =>
                      push(
                        "/reference/" +
                          currentValue.substring(0, currentValue.length - 1),
                      )
                    }
                  >
                    {item.value.split("-").join(" ")}
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        </Row>
      </Row>
    </form>
  );
}
