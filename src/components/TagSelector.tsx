import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function TagSelector({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: any;
}) {
  const t = useTranslations();

  const [inputValue, setInputValue] = useState("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    }
  };

  const handleInputKeyDown = (e: any) => {
    const isEnter = e.key === "Enter";
    const isBackspace = e.key === "Backspace";

    if (isEnter) {
      if (inputValue.trim() === "") return;
      e.preventDefault();
      addTopic(inputValue.trim());
    } else if (isBackspace && inputValue === "") {
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
    const isAlreadyExist = tags.includes(input);
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
    <div
      ref={containerRef}
      className="flex min-h-[53px] w-full flex-wrap items-center rounded border border-gray-400 bg-gray-50 px-[10px] py-[6px]"
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
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="body6 bg-transparent p-2 focus:outline-none"
            style={{ width: `${Math.max(inputValue.length, 10) * 10}px` }}
          />
        )}
        {tags.length < 4 && isPlaceholderVisible && (
          <span className="body6 pointer-events-none absolute left-2 top-2 text-gray-400">
            Add a Topic
          </span>
        )}
      </div>
    </div>
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
