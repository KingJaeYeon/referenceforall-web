"use client";
import { Search } from "lucide-react";
import Row from "@/components/Layout/Row";
import React from "react";

export default function SearchInput() {
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Row
        // ref={containerRef}
        className="my-[24px] min-h-[40px] w-full flex-wrap items-center rounded-full bg-button-secondary text-button-secondary-foreground tb:min-h-[63px]"
      >
        <Search className="mx-[12px] h-[24px] w-[24px] tb:ml-[24px] tb:mr-[16px]" />
        {/*<div className="relative w-fit">*/}
        {/*  {tags.length < 4 && (*/}
        {/*    <Command*/}
        {/*      className={"bg-transparent"}*/}
        {/*      onValueChange={setCommandValue}*/}
        {/*      value={commandValue}*/}
        {/*    >*/}
        <input
          // ref={inputRef}
          type="text"
          placeholder={"Search topics"}
          // value={inputValue}
          // onChange={handleInputChange}
          // onKeyDown={handleInputKeyDown}
          className="body5 flex-1 bg-transparent py-[10px] pr-[20px] focus:outline-none"
        />
        {/*      {!!data && data?.length > 0 && (*/}
        {/*        <CommandList*/}
        {/*          className={*/}
        {/*            "absolute top-[38px] border border-gray-200 bg-white"*/}
        {/*          }*/}
        {/*        >*/}
        {/*          {data.map((item) => (*/}
        {/*            <CommandItem*/}
        {/*              key={item.value}*/}
        {/*              className={"pr-[20px]"}*/}
        {/*              value={item.value}*/}
        {/*              onSelect={(currentValue) => addTopic(currentValue)}*/}
        {/*            >*/}
        {/*              {item.value} ({item.count})*/}
        {/*            </CommandItem>*/}
        {/*          ))}*/}
        {/*        </CommandList>*/}
        {/*      )}*/}
        {/*    </Command>*/}
        {/*  )}*/}
        {/*  {tags.length < 4 && isPlaceholderVisible && (*/}
        {/*    <span className="body6 pointer-events-none absolute left-2 top-2 text-gray-400">*/}
        {/*    Add a Topic*/}
        {/*  </span>*/}
        {/*  )}*/}
        {/*</div>*/}
      </Row>
    </form>
  );
}
