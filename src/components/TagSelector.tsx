import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import useDebounce from "@/hook/useDebounce";
import { useQuery } from "@tanstack/react-query";
import Row from "@/components/Layout/Row";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const searchTopics = async (
  query: string,
): Promise<{ value: string; count: number }[]> => {
  // 실제 구현에서는 이 부분을 백엔드 API 호출로 대체해야 합니다.
  const allTopics = [
    { value: "React", count: 100 },
    { value: "JavaScript", count: 100 },
    { value: "TypeScript", count: 100 },
    { value: "Nodejs", count: 100 },
    { value: "Python", count: 100 },
    { value: "Machine Learning", count: 100 },
    { value: "Data Science", count: 100 },
    { value: "Artificial Intelligence", count: 100 },
    { value: "Web Development", count: 100 },
    { value: "Mobile Development", count: 100 },
    { value: "Cloud Computing", count: 100 },
    { value: "DevOps", count: 100 },
    { value: "Blockchain", count: 100 },
    { value: "Cybersecurity", count: 100 },
    { value: "UX UI Design", count: 100 },
  ];
  const res = allTopics
    .filter((topic) => topic.value.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);

  return res ?? [];
};

export default function TagSelector({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: any;
}) {
  const t = useTranslations();

  const [inputValue, setInputValue] = useState("");
  const debounce = useDebounce(inputValue);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [commandValue, setCommandValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useQuery({
    queryFn: () => searchTopics(debounce),
    queryKey: ["searchTopics", debounce],
    enabled: debounce.length >= 2,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    // 문자열이 공백으로 시작하는 경우 입력을 무시
    if (value.length > inputValue.length && value.startsWith(" ")) {
      return;
    }

    setIsPlaceholderVisible(value === "");

    if (value.endsWith("  ")) {
      addTopic(value.trim());
    } else {
      setInputValue(value);
      setCommandValue(value);
    }
  };

  const handleInputKeyDown = (e: any) => {
    const isEnter = e.key === "Enter";
    const isBackspace = e.key === "Backspace";

    if (isEnter) {
      console.log("commandValue", commandValue, inputValue);
      if (inputValue.trim() === "") return;
      if (commandValue) return addTopic(commandValue);
      e.preventDefault();
      addTopic(inputValue.trim());
    }

    if (isBackspace && inputValue === "") {
      e.preventDefault();
      focusLastTopic();
    }
  };

  const isValidInput = (input: string) => {
    const RegExp = /^[a-zA-Z0-9가-힣\s\-]+$/;
    if (!RegExp.test(input)) {
      return {
        isValid: false,
        message: t("tag_validInput"),
      };
    }
    const isMaxLength = input.length <= 25;
    if (!isMaxLength) {
      return {
        isValid: false,
        message: t("tag_maxLength"),
      };
    }
    const isAlreadyExist = tags.find(
      (tag) => tag.toUpperCase() === input.toUpperCase(),
    );
    if (isAlreadyExist) {
      return {
        isValid: false,
        message: t("tag_alreadyExist"),
      };
    }

    return {
      isValid: true,
      message: "",
    };
  };

  const addTopic = (value: string) => {
    const { isValid, message } = isValidInput(value);
    if (isValid) {
      setTags([...tags, value.trim()]);
      setInputValue("");
      setCommandValue("");
      setIsPlaceholderVisible(true);
    } else {
      toast.error(message);
    }
  };

  const removeTopic = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    inputRef?.current?.focus();
  };

  const focusLastTopic = () => {
    const buttons = containerRef?.current?.querySelectorAll("button");
    if (!!buttons && buttons.length > 0) {
      const lastButton = buttons[buttons.length - 1];
      lastButton.focus();
    }
  };

  const handleTopicKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      removeTopic(index);
    }
  };

  return (
    <Row
      ref={containerRef}
      className="min-h-[53px] w-full flex-wrap items-center rounded border border-gray-400 bg-gray-50 px-[10px] py-[6px]"
    >
      {tags.map((tag, index) => (
        <TopicButton
          key={index}
          label={tag}
          onRemove={() => removeTopic(index)}
          onKeyDown={(e: any) => handleTopicKeyDown(e, index)}
        />
      ))}
      <div className="relative w-fit">
        {tags.length < 4 && (
          <Command
            className={"bg-transparent"}
            onValueChange={setCommandValue}
            value={commandValue}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="body6 bg-transparent p-2 focus:outline-none"
            />
            {!!data && data?.length > 0 && (
              <CommandList
                className={
                  "absolute top-[38px] border border-gray-200 bg-white"
                }
              >
                {data.map((item, index) => (
                  <CommandItem
                    key={item.value}
                    className={"pr-[20px]"}
                    value={item.value}
                  >
                    {item.value} ({item.count})
                  </CommandItem>
                ))}
              </CommandList>
            )}
          </Command>
        )}
        {tags.length < 4 && isPlaceholderVisible && (
          <span className="body6 pointer-events-none absolute left-2 top-2 text-gray-400">
            Add a Topic
          </span>
        )}
      </div>
    </Row>
  );
}

const TopicButton = ({
  label,
  onRemove,
  onKeyDown,
}: {
  label: string;
  onRemove: any;
  onKeyDown: any;
}) => {
  return (
    <button
      onClick={onRemove}
      onKeyDown={onKeyDown}
      className="body4 relative m-1 rounded-[3px] border border-gray-200 bg-white py-[5px] pl-[10px] pr-[24px] text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-300"
    >
      {label} <span className={"absolute right-2"}>×</span>
    </button>
  );
};
