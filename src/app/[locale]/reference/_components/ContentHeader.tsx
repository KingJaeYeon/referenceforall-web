"use client";
import Text from "@/components/Layout/Text";
import Row from "@/components/Layout/Row";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@/assets/svg";
import { useEffect, useRef, useState } from "react";
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
import Col from "@/components/Layout/Col";

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
        <Col className={"gap-3"}>
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
          <Col className={"gap-2"}>
            <Text>추가 검색할 주제를 입력해주세요.(최대 4개)</Text>
            <Input
              id="topic-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="토픽을 검색하세요..."
            />
            <EditableDiv />
          </Col>
        </Col>
        <DialogFooter>
          <Button type="submit">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const EditableDiv = () => {
  const [buttons, setButtons] = useState([]);
  const [spaceCount, setSpaceCount] = useState(0);
  const divRef = useRef(null);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        if (currentText !== "") {
          setSpaceCount((prev) => prev + 1);
        }
      } else {
        setSpaceCount(0); // 스페이스가 아닌 키를 누르면 카운트 초기화
      }
    };

    const handleInput = () => {
      // 현재 입력된 텍스트를 저장
      setCurrentText(divRef.current.textContent.trim());
    };

    if (divRef.current) {
      divRef.current.addEventListener("keydown", handleKeyDown);
      divRef.current.addEventListener("input", handleInput);
    }

    return () => {
      if (divRef.current) {
        divRef.current.removeEventListener("keydown", handleKeyDown);
        divRef.current.removeEventListener("input", handleInput);
      }
    };
  }, [currentText]);

  useEffect(() => {
    if (spaceCount >= 2 && currentText) {
      // 버튼을 추가하고 스페이스 카운트 및 텍스트 초기화
      setButtons((prevButtons) => [
        ...prevButtons,
        <button key={prevButtons.length}>{currentText}</button>,
      ]);
      setSpaceCount(0);
      setCurrentText(""); // 텍스트 초기화
      divRef.current.textContent = ""; // 입력 필드 비우기
    }
  }, [spaceCount, currentText]);

  return (
    <div>
      <div
        contentEditable={true}
        ref={divRef}
        style={{
          border: "1px solid black",
          minHeight: "100px",
          padding: "10px",
        }}
      ></div>
      <div>
        {buttons.map((button, index) => (
          <span key={index} style={{ marginRight: "5px" }}>
            {button}
          </span>
        ))}
      </div>
    </div>
  );
};
