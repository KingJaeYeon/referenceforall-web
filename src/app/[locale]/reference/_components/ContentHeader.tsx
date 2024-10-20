"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Col from "@/components/Layout/Col";
import TagSelector from "@/components/TagSelector";
import { useSearchParams } from "next/navigation";
import useUrlParams from "@/hook/useUrlParams";

export function ContentHeader() {
  return (
    <>
      <Text className={"heading1 h-[52px] text-[42px] font-medium"}>
        Productivity
      </Text>
      <Text className={"body3 mb-6 mt-4 h-[24px]"}>
        10개의 사이트가 검색되었습니다.
      </Text>
      <Row className={"justify-center"}>
        <AddTopicPopup>
          <Button className={"w-fit font-medium"} rounded={"full"}>
            <IconPlus className={"h-4 w-4"} /> Topic 추가
          </Button>
        </AddTopicPopup>
      </Row>
    </>
  );
}

const searchTopics = async (query: string): Promise<string[]> => {
  // 실제 구현에서는 이 부분을 백엔드 API 호출로 대체해야 합니다.
  const allTopics = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Machine Learning",
    "Data Science",
    "Artificial Intelligence",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "DevOps",
    "Blockchain",
    "Cybersecurity",
    "UX/UI Design",
  ];
  return allTopics
    .filter((topic) => topic.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 15);
};

function AddTopicPopup({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { updateUrlParam } = useUrlParams();
  const [searchMode, setSearchMode] = useState<string>("and");
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchTopics(searchQuery).then(setSearchResults);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const openHandler = (open: boolean) => {
    if (open) {
      setTags(searchParams.get("tags")?.split(",") || []);
      setSearchMode(searchParams.get("searchMode") || "and");
    }
    setOpen(open);
  };

  const submitHandler = () => {
    updateUrlParam("searchMode", searchMode.toLowerCase());
    updateUrlParam("tags", tags.join(","));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={openHandler}>
      <DialogTrigger asChild className={"w-[80px]"}>
        {children}
      </DialogTrigger>
      <DialogContent className="tb:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Topic 추가 선택</DialogTitle>
        </DialogHeader>
        <Col className={"gap-3"}>
          <Col className={"gap-2"}>
            <Text className={"body5"}>
              추가 검색할 주제를 입력해주세요.(최대 4개)
            </Text>
            <TagSelector tags={tags} setTags={setTags} />
          </Col>
          <div className="flex items-center justify-between">
            <Label htmlFor="search-mode" className="text-right">
              검색 모드: {searchMode.toUpperCase()}
            </Label>
            <Switch
              id="search-mode"
              checked={searchMode === "or"}
              onCheckedChange={(checked) =>
                setSearchMode(checked ? "or" : "and")
              }
              custonLable={{ on: "OR", off: "AND" }}
            />
          </div>
        </Col>
        <DialogFooter>
          <Button type="submit" onClick={submitHandler}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
