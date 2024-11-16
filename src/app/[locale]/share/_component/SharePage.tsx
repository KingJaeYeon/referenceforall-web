"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { Image } from "@/util/imageUpload";

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

// Image Upload Components
const ImageUploadButton = ({ onClick }: { onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
  >
    <ImagePlus className="h-10 w-10 text-gray-400" />
    <p className="mt-2 text-sm text-gray-500">Click to upload photo</p>
  </div>
);

const ImagePreview = ({
  preview,
  onRemove,
}: {
  preview: string;
  onRemove: () => void;
}) => (
  <div className="group relative aspect-video w-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300">
    <img
      src={preview}
      alt="Preview"
      className="h-full w-full rounded-lg object-cover"
    />
    <div className="absolute inset-0 hidden items-center justify-center rounded-lg bg-black/40 group-hover:flex">
      <Button
        onClick={onRemove}
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const ImageStep = ({ control }: { control: any }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const screenshotInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean,
    field: any,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isMain) {
          field.onChange({
            file: file,
            preview: reader.result as string,
          });
        } else {
          const newScreenshot = {
            file: file,
            preview: reader.result as string,
          };
          field.onChange([...field.value, newScreenshot]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Col className="gap-[20px] pb-[50px] sm:pb-0 md:gap-[28px]">
      <FormField
        control={control}
        name="image.main"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              메인 이미지
            </Label>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, true, field)}
            />
            <Row className="mt-[8px] min-h-[100px]">
              {field.value?.preview ? (
                <ImagePreview
                  preview={field.value.preview}
                  onRemove={() => {
                    field.onChange({ file: null, preview: null });
                    fileInputRef.current!.value = "";
                  }}
                />
              ) : (
                <ImageUploadButton
                  onClick={() => fileInputRef.current?.click()}
                />
              )}
            </Row>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="image.screenshots"
        render={({ field }) => (
          <FormItem>
            <Label font={"heading4"} className={"font-medium"}>
              스크린샷
              <span className={"body3 ml-[6px] font-light text-gray-400"}>
                Max to 2
              </span>
            </Label>
            <input
              type="file"
              ref={screenshotInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, false, field)}
            />
            <div className="mt-[8px] grid grid-cols-1 gap-4 sm:grid-cols-2">
              {field.value.map((screenshot: Image, index: number) => (
                <ImagePreview
                  key={index}
                  preview={screenshot.preview!}
                  onRemove={() => {
                    const newScreenshots = [...field.value];
                    newScreenshots.splice(index, 1);
                    field.onChange(newScreenshots);
                  }}
                />
              ))}
              {field.value.length < 2 && (
                <ImageUploadButton
                  onClick={() => screenshotInputRef.current?.click()}
                />
              )}
            </div>
            <FormMessage font={"body5"} className={"pt-2 font-light"} />
          </FormItem>
        )}
      />
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
  const submitRef = useRef<HTMLButtonElement>(null);

  const shareFormSchema = z.object({
    link: z.string().url("올바른 URL을 입력해주세요"),
    title: z
      .string()
      .min(1, "사이트 이름을 입력해주세요")
      .max(32, "사이트 이름은 32자 이내로 입력해주세요"),
    description: z.string().min(10, "설명을 10자 이상 입력해주세요"),
    tags: z.array(z.string()).min(1, "태그를 1개 이상 입력해주세요"),
    image: z.object({
      main: z.object({
        file: z.instanceof(File).nullable(),
        preview: z.string().nullable(),
      }),
      screenshots: z
        .array(
          z.object({
            file: z.instanceof(File).nullable(),
            preview: z.string().nullable(),
          }),
        )
        .max(2, "스크린샷은 최대 2개까지 등록할 수 있습니다"),
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
        main: {
          file: null,
          preview: null,
        },
        screenshots: [],
      },
      usageTiming: "",
      features: "",
    },
  });

  const { control, handleSubmit, watch, setValue, trigger } = form;
  const tags = watch("tags");

  const onSubmit = (data: ShareFormData) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("tags", currentTag);
  }, [currentTag]);

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
        return <ImageStep control={control} />;
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
            <button type="submit" ref={submitRef} />
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
            type="button"
            font={"heading4"}
            className="h-[42px] rounded-[4px] px-[20px] font-semibold text-black"
            onClick={() => submitRef.current?.click()}
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
