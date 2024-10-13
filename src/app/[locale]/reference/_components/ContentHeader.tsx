"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import { useEffect, useState } from "react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import ButtonSwitcher from "@/components/ButtonSwitcher";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function ContentHeader() {
  const [topic, setTopic] = useState<{ index: number; tag: string }[]>([]);

  return (
    <>
      <Text className={"heading1 h-[52px] text-[42px] font-medium"}>
        Productivity
      </Text>
      <Text className={"body3 mb-6 mt-4 h-[24px]"}>
        10개의 사이트가 검색되었습니다.
      </Text>
      <Row className={"justify-center"}>
        <AddTopicPopup topic={topic} setTopic={setTopic}>
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
function AddTopicPopup({
  children,
  topic,
  setTopic,
}: {
  children: React.ReactNode;
  topic: any;
  setTopic: any;
}) {
  const [searchMode, setSearchMode] = useState<string>("AND");
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
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

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  // const handleSave = () => {
  //   onSave({ topics: selectedTopics, mode: searchMode });
  //   onClose();
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={"w-[80px]"}>
        {children}
      </DialogTrigger>
      <DialogContent className="tb:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Topic 추가 선택</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="search-mode" className="text-right">
              검색 모드: {searchMode}
            </Label>
            <Switch
              id="search-mode"
              checked={searchMode === "OR"}
              onCheckedChange={(checked) =>
                setSearchMode(checked ? "OR" : "AND")
              }
            />
          </div>
          <div>
            <Label htmlFor="topic-search" className="text-right">
              토픽 검색
            </Label>
            <Input
              id="topic-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="토픽을 검색하세요..."
            />
          </div>
          <ScrollArea className="h-[200px] w-full rounded-md border border-input-border p-4">
            {searchResults.map((topic) => (
              <div key={topic} className="mb-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={topic}
                  checked={selectedTopics.includes(topic)}
                  onChange={() => handleTopicToggle(topic)}
                />
                <label htmlFor={topic}>{topic}</label>
              </div>
            ))}
          </ScrollArea>
          <div>
            <Label className="mb-2 text-right">선택된 토픽:</Label>
            <div className="flex flex-wrap gap-2">
              {selectedTopics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-sm">
                  {topic}
                  <button
                    onClick={() => handleTopicToggle(topic)}
                    className="ml-1 text-xs"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
