"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Col,Row,Text } from "@/components/layout";
import { cn } from "@/lib/utils";
import { BasicInfoStep } from "@/app/[locale]/(main)/share/_component/BasicInfoStep";
import { DetailStep } from "@/app/[locale]/(main)/share/_component/DetailStep";
import { ImageStep } from "@/app/[locale]/(main)/share/_component/ImageStep";

export default function StepShareSiteForm() {
  const [currentStep, setCurrentStep] = useState(1);
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
          "mx-auto w-full max-w-[780px] flex-1 px-4 pb-[120px] pt-[20px] md:pt-[48px]"
        }
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* Step Indicator와 타이틀 */}
            <Col className={"pb-[24px] md:pb-[40px]"}>
              <h2 className="body7 pb-[16px] text-gray-400 md:pb-[24px]">
                STEP {currentStep} / 3
              </h2>
              <h1 className="heading1 text-[24px] font-semibold sm:text-[28px] md:text-[32px]">
                {currentStep === 1 && "사이트의 기본 정보를 입력해주세요"}
                {currentStep === 2 && "사이트의 이미지를 등록해주세요"}
                {currentStep === 3 && "사이트의 상세 정보를 입력해주세요"}
              </h1>
              <Text className="body3 pt-[8px] text-[15px] text-gray-600 md:pt-[12px]">
                공유하고 싶은 사이트의 정보를 입력해주세요. <br />
                관리자가 확인 후 미입력 정보는 추가해서 게시됩니다.
              </Text>
            </Col>

            {/* Form Content */}
            <div>{renderStep()}</div>
            <button type="submit" ref={submitRef} />
            <Row className={"flex h-[50px] justify-end md:hidden"}>
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
          </form>
        </Form>
      </Row>
      {/* Navigation */}

      <Row
        className={cn(
          "fixed bottom-0 hidden h-[66px] w-full justify-between bg-white px-6 py-3 shadow-bottomNav md:flex md:justify-end",
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
