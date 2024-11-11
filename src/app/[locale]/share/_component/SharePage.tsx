"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

const ShareSiteForm = () => {
  const [currentTag, setCurrentTag] = useState("");
  const shareFormSchema = z.object({
    link: z.string().url("올바른 URL을 입력해주세요"),
    title: z.string().min(1, "사이트 이름을 입력해주세요"),
    description: z.string().min(10, "설명을 10자 이상 입력해주세요"),
    tags: z.array(z.string()),
    image: z.object({
      main: z.string().url("올바른 이미지 URL을 입력해주세요"),
      screenshots: z.array(z.string().url("올바른 이미지 URL을 입력해주세요")),
    }),
    usageTiming: z.string().min(10, "사용 시나리오를 10자 이상 입력해주세요"),
    features: z.string().min(10, "주요 기능을 10자 이상 입력해주세요"),
  });

  type ShareFormData = z.infer<typeof shareFormSchema>;

  const form = useForm<ShareFormData>({
    resolver: zodResolver(shareFormSchema),
    defaultValues: {
      link: "",
      title: "",
      description: "",
      tags: [],
      image: {
        main: "",
        screenshots: [],
      },
      usageTiming: "",
      features: "",
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const screenshots = watch("image.screenshots");
  const tags = watch("tags");

  const onSubmit = (data: ShareFormData) => {
    console.log(data);
    // API 호출 로직
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      setValue("tags", [...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setValue(
      "tags",
      tags.filter((_, index) => index !== indexToRemove),
    );
  };

  const addScreenshot = () => {
    setValue("image.screenshots", [...screenshots, ""]);
  };

  const removeScreenshot = (index: number) => {
    setValue(
      "image.screenshots",
      screenshots.filter((_, i) => i !== index),
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 px-4 py-8"
      >
        {/* 기본 정보 섹션 */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <Label>사이트 링크 *</Label>
                <FormControl>
                  <Input
                    placeholder="https://"
                    {...field}
                    inputClassName={"px-3"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>사이트 이름 *</Label>
                <FormControl>
                  <Input
                    placeholder="사이트 이름을 입력해주세요"
                    {...field}
                    inputClassName={"px-3"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <Label>사이트 설명 *</Label>
                <FormControl>
                  <Textarea
                    placeholder="사이트에 대한 간단한 설명을 입력해주세요(10자 이상)"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 태그 섹션 */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="tags"
            render={() => (
              <FormItem>
                <Label>태그</Label>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      placeholder="태그를 입력하고 Enter를 눌러주세요"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleTagAdd}
                      inputClassName={"px-3"}
                    />
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* 이미지 섹션 */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="image.main"
            render={({ field }) => (
              <FormItem>
                <Label>대표 이미지 URL *</Label>
                <FormControl>
                  <Input
                    placeholder="대표 이미지 URL을 입력해주세요"
                    {...field}
                    inputClassName={"px-3"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>스크린샷 URL</Label>
            <div className="space-y-2">
              {screenshots.map((_, index) => (
                <Controller
                  key={index}
                  control={control}
                  name={`image.screenshots.${index}`}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      <Input
                        placeholder={`스크린샷 ${index + 1} URL을 입력해주세요`}
                        {...field}
                        inputClassName={"px-3"}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeScreenshot(index)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  )}
                />
              ))}
              <Button type="button" variant="outline" onClick={addScreenshot}>
                <ImagePlus className="mr-2 h-4 w-4" />
                스크린샷 추가
              </Button>
            </div>
          </div>
        </div>

        {/* 사용 시나리오 & 주요 기능 섹션 */}
        <div className="space-y-4">
          <FormField
            control={control}
            name="usageTiming"
            render={({ field }) => (
              <FormItem>
                <Label>사용 시나리오 *</Label>
                <FormControl>
                  <Textarea
                    placeholder="사이트의 사용 시나리오를 입력해주세요"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <Label>주요 기능 *</Label>
                <FormControl>
                  <Textarea
                    placeholder="사이트의 주요 기능을 입력해주세요"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          사이트 등록하기
        </Button>
      </form>
    </Form>
  );
};

export default ShareSiteForm;
