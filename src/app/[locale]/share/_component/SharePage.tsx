"use client";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, ImagePlus, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { Label } from "@/components/ui/label";
import TagSelector from "@/components/TagSelector";
import Row from "@/components/Layout/Row";
import { cn } from "@/lib/utils";

const BasicInfoStep = ({ control, currentTag, setCurrentTag }: any) => {
  return (
    <Col className="gap-[20px] pb-[50px] sm:pb-0 md:gap-[28px]">
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
};

const ImagePreview = ({ imageUrl, onRemove, index }: any) => {
  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt={`Preview ${index + 1}`}
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/400/225";
              target.alt = "Invalid image URL";
            }}
          />
          <div className="absolute inset-0 hidden bg-black/40 transition-all group-hover:block">
            <Button
              onClick={onRemove}
              className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-lg hover:bg-gray-100"
              variant="ghost"
            >
              <X size={16} className="text-gray-600" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-gray-50">
          <Plus className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const ImageStep = ({
  control,
  mainImage,
  screenshots,
  onRemoveScreenshot,
  onAddScreenshot,
}: any) => {
  return (
    <Col className="gap-[20px] pb-[50px] sm:h-[600px] sm:pb-0 md:gap-[28px]">
      <Card className="mx-auto max-w-[780px]">
        <CardHeader>
          <CardTitle>Property photos</CardTitle>
          <CardDescription>
            You need 5 photos to start. You can add more later.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-base font-medium">Main photo</p>
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
                  <Input placeholder="Enter main photo URL" {...field} />
                </div>
              )}
            />
          </div>
          <div className="space-y-4">
            <p className="text-base font-medium">Screenshots</p>
            {screenshots.map((_: any, index: number) => (
              <div key={index} className="space-y-2">
                <Controller
                  control={control}
                  name={`image.screenshots.${index}`}
                  render={({ field }) => (
                    <div>
                      <ImagePreview
                        imageUrl={field.value}
                        onRemove={() => onRemoveScreenshot(index)}
                        index={index}
                      />
                      <Input
                        placeholder={`Enter screenshot ${index + 1} URL`}
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>
            ))}
            {screenshots.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={onAddScreenshot}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add photo
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Col>
  );
};
const DetailStep = ({ control }: any) => {
  return (
    <Col className="gap-[20px] pb-[50px] sm:pb-0 md:gap-[28px]">
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
};

export default function StepShareSiteForm() {
  const [currentStep, setCurrentStep] = useState(3);
  const [currentTag, setCurrentTag] = useState([]);

  const shareFormSchema = z.object({
    link: z.string().url("올바른 URL을 입력해주세요"),
    title: z
      .string()
      .min(1, "사이트 이름을 입력해주세요")
      .max(32, "사이트 이름은 32자 이내로 입력해주세요"),
    description: z.string().min(10, "설명을 10자 이상 입력해주세요"),
    tags: z.array(z.string()).min(1, "태그를 1개 이상 입력해주세요"),
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

  useEffect(() => {
    setValue("tags", currentTag);
  }, [currentTag]);

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
    let fieldsToValidate: any = [];

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
    <>
      <Row
        className={
          "mx-auto w-full max-w-[780px] flex-1 p-4 pb-[24px] md:pt-[48px] lg:px-0"
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Step Indicator와 타이틀 */}
            <Col className={"pb-[24px] md:pb-[40px]"}>
              <h2 className="body7 pb-[16px] text-gray-400 md:pb-[24px]">
                STEP {currentStep} / 3
              </h2>
              <h1 className="heading1 text-[28px] font-semibold md:text-[32px]">
                {currentStep === 1 && "사이트의 기본 정보를 입력해주세요"}
                {currentStep === 2 && "사이트의 이미지를 등록해주세요"}
                {currentStep === 3 && "사이트의 상세 정보를 입력해주세요"}
              </h1>
              <Text className="body3 pt-[8px] text-gray-600 md:pt-[12px]">
                공유하고 싶은 사이트의 정보를 입력해주세요. 관리자 확인 후
                게시됩니다.
              </Text>
            </Col>

            {/* Form Content */}
            <div className="min-h-[400px]">{renderStep()}</div>
          </form>
        </Form>
      </Row>
      {/* Navigation */}
      <Row
        className={cn(
          "sticky bottom-0 h-[66px] w-full justify-between bg-white px-6 py-3 shadow-bottomNav md:justify-end",
        )}
      >
        {currentStep > 1 ? (
          <Button
            type="button"
            variant="default"
            onClick={handleBack}
            disabled={currentStep === 1}
            font={"heading4"}
            className="mr-[32px] h-[42px] font-semibold"
          >
            Back
          </Button>
        ) : (
          <div />
        )}

        {currentStep === 3 ? (
          <Button
            type="submit"
            font={"heading4"}
            className="h-[42px] rounded-[4px] px-[20px] font-semibold text-black"
          >
            Submit
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            font={"heading4"}
            className="h-[42px] rounded-[4px] px-[20px] font-semibold text-black"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </Row>
    </>
  );
}
