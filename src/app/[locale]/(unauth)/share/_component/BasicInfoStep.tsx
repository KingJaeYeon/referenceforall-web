import Col from "@/components/Layout/Col";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TagSelector from "@/components/TagSelector";
import React from "react";

export function BasicInfoStep({ control, currentTag, setCurrentTag }: any) {
  return (
    <Col className="gap-[20px] md:gap-[28px]">
      <FormField
        control={control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              사이트 링크
            </Label>
            <FormControl>
              <Input
                inputClassName="px-3 mt-[8px] rounded-[3px]"
                font={"body3"}
                placeholder="https://"
                {...field}
              />
            </FormControl>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              사이트 이름
            </Label>
            <FormControl>
              <Input
                inputClassName="px-3 mt-[8px] rounded-[3px]"
                placeholder="사이트 이름을 입력해주세요"
                {...field}
              />
            </FormControl>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              사이트 설명
            </Label>
            <FormControl>
              <Textarea
                showMaxLength
                placeholder="사이트에 대한 간단한 설명을 입력해주세요 (10자 이상)"
                className="mt-[8px] min-h-[100px] resize-none rounded-[3px] px-3"
                {...field}
              />
            </FormControl>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={() => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              태그
              <span className={"body3 ml-[6px] font-light text-gray-400"}>
                Up to 1
              </span>
            </Label>
            <FormControl>
              <TagSelector
                tags={currentTag}
                setTags={setCurrentTag}
                className={"mt-[8px] rounded-[3px] bg-transparent px-3"}
                maxTags={5}
              />
            </FormControl>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />
    </Col>
  );
}
