"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ImagePlus,
  X,
  Link as LinkIcon,
  Tag,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const ImagePreview = ({ imageUrl, onRemove, index }) => {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={`Preview ${index + 1}`}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/225";
              e.target.alt = "Invalid image URL";
            }}
          />
          <div className="absolute inset-0 hidden bg-black/40 transition-all group-hover:block">
            <button
              onClick={onRemove}
              className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-lg hover:bg-gray-100"
              type="button"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-gray-50">
          <ImagePlus className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const BasicInfoStep = ({
  control,
  currentTag,
  setCurrentTag,
  tags,
  removeTag,
  handleTagAdd,
}) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>사이트 링크</FormLabel>
            <FormControl>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input className="pl-10" placeholder="https://" {...field} />
              </div>
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
            <FormLabel>사이트 이름</FormLabel>
            <FormControl>
              <Input placeholder="사이트 이름을 입력해주세요" {...field} />
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
            <FormLabel>사이트 설명</FormLabel>
            <FormControl>
              <Textarea
                placeholder="사이트에 대한 간단한 설명을 입력해주세요 (10자 이상)"
                className="min-h-[100px] resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="tags"
        render={() => (
          <FormItem>
            <FormLabel>태그</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <div className="relative">
                  <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="태그를 입력하고 Enter를 눌러주세요"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagAdd}
                  />
                </div>
                <ScrollArea className="h-20">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-default gap-1 px-3 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-gray-200"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const ImageStep = ({
  control,
  mainImage,
  screenshots,
  onRemoveScreenshot,
  onAddScreenshot,
}) => {
  return (
    <div className="mx-auto max-w-[780px]">
      <CardHeader>
        <CardTitle>이미지</CardTitle>
        <CardDescription>
          사이트를 대표하는 이미지와 스크린샷을 등록해주세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <FormLabel className="text-base">대표 이미지</FormLabel>
          <Controller
            control={control}
            name="image.main"
            render={({ field }) => (
              <div className="space-y-2">
                <ImagePreview
                  imageUrl={field.value}
                  onRemove={() => field.onChange("")}
                  index={-1}
                />
                <Input
                  placeholder="대표 이미지 URL을 입력해주세요"
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormLabel className="text-base">스크린샷</FormLabel>
          <div className="space-y-4">
            {screenshots.map((_, index) => (
              <div key={index} className="space-y-2">
                <Controller
                  control={control}
                  name={`image.screenshots.${index}`}
                  render={({ field }) => (
                    <>
                      <ImagePreview
                        imageUrl={field.value}
                        onRemove={() => onRemoveScreenshot(index)}
                        index={index}
                      />
                      <Input
                        placeholder={`스크린샷 ${index + 1} URL을 입력해주세요`}
                        {...field}
                      />
                    </>
                  )}
                />
              </div>
            ))}
            {screenshots.length < 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={onAddScreenshot}
                className="w-full py-2"
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                스크린샷 추가
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </div>
  );
};

const DetailStep = ({ control }) => {
  return (
    <div className="mx-auto max-w-[780px]">
      <CardHeader>
        <CardTitle>상세 정보</CardTitle>
        <CardDescription>사이트의 상세 정보를 입력해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="usageTiming"
          render={({ field }) => (
            <FormItem>
              <FormLabel>사용 시나리오</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="사이트의 사용 시나리오를 입력해주세요"
                  className="min-h-[100px] resize-none"
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
              <FormLabel>주요 기능</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="사이트의 주요 기능을 입력해주세요"
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </div>
  );
};

export default function StepShareSiteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTag, setCurrentTag] = useState("");

  const shareFormSchema = z.object({
    link: z.string().url("올바른 URL을 입력해주세요"),
    title: z.string().min(1, "사이트 이름을 입력해주세요"),
    description: z.string().min(10, "설명을 10자 이상 입력해주세요"),
    tags: z.array(z.string()),
    image: z.object({
      main: z.string().optional(),
      screenshots: z
        .array(z.string().url("올바른 이미지 URL을 입력해주세요"))
        .max(2, "스크린샷은 최대 2개까지 등록할 수 있습니다")
        .min(0),
    }),
    usageTiming: z.string().optional(),
    features: z.string().optional(),
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

  const { control, handleSubmit, watch, setValue, trigger } = form;
  const screenshots = watch("image.screenshots");
  const tags = watch("tags");
  const mainImage = watch("image.main");

  const onSubmit = (data: ShareFormData) => {
    console.log(data);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setValue("tags", [...tags, currentTag.trim()]);
      }
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

  const handleNext = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["link", "title", "description", "tags"];
        break;
      case 2:
        fieldsToValidate = ["image.main", "image.screenshots"];
        break;
      case 3:
        fieldsToValidate = ["usageTiming", "features"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            control={control}
            currentTag={currentTag}
            setCurrentTag={setCurrentTag}
            tags={tags}
            removeTag={removeTag}
            handleTagAdd={handleTagAdd}
          />
        );
      case 2:
        return (
          <ImageStep
            control={control}
            mainImage={mainImage}
            screenshots={screenshots}
            onRemoveScreenshot={removeScreenshot}
            onAddScreenshot={addScreenshot}
          />
        );
      case 3:
        return <DetailStep control={control} />;
      default:
        return null;
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[780px] py-8"
      >
        <div className="space-y-8">
          {/* Step Indicator와 타이틀 */}
          <div className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-[12px] font-semibold">
                Step {currentStep} / 3
              </h2>
              <h1 className="text-2xl font-bold">
                {currentStep === 1 && "사이트의 기본 정보를 입력해주세요"}
                {currentStep === 2 && "사이트의 이미지를 등록해주세요"}
                {currentStep === 3 && "사이트의 상세 정보를 입력해주세요"}
              </h1>
              <p className="text-sm text-gray-500">
                공유하고 싶은 사이트의 정보를 입력해주세요. 관리자 확인 후
                게시됩니다.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[400px] py-8">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between border-t pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="w-24"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep === 3 ? (
              <Button type="submit" className="w-24">
                Submit
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} className="w-24">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
