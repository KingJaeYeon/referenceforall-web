import Col from "@/components/Layout/Col";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export function DetailStep({ control }: any) {
  return (
    <Col className="gap-[20px] md:gap-[28px]">
      <FormField
        control={control}
        name="usageTiming"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              사용 시나리오
              <span className={"body3 ml-[6px] text-gray-400"}>Optional</span>
            </Label>
            <FormControl>
              <Textarea
                placeholder="사이트의 사용 시나리오를 입력해주세요"
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
        name="features"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              주요 기능
              <span className={"body3 ml-[6px] text-gray-400"}>Optional</span>
            </Label>
            <FormControl>
              <Textarea
                placeholder="사이트의 주요 기능을 입력해주세요"
                className="mt-[8px] min-h-[100px] resize-none rounded-[3px] px-3"
                {...field}
              />
            </FormControl>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />
    </Col>
  );
}
