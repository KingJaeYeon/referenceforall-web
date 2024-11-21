// Image Upload Components
import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import React from "react";
import Col from "@/components/Layout/Col";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import Row from "@/components/Layout/Row";
import { Image } from "@/util/imageUpload";

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

export function ImageStep({ control }: { control: any }) {
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
    <Col className="gap-[20px] md:gap-[28px]">
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
}
