import useUserStore from "@/store/userStore";
import { useTranslation } from "@/app/i18n/client";
import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateMyAvatar } from "@/service/user-service";
import { toast } from "sonner";
import compressImage from "@/lib/compressImage";
import { Col, Row } from "@/components/layout";
import { Label } from "@/components/ui/label";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";

export function EditAvatar() {
  const { user, setAvatar } = useUserStore();
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateMyAvatar,
    onSuccess: (r) => {
      setAvatar(r.data.url);
      toast.success("Avatar 변경되었습니다");
    },
    onError: () => {
      toast.error("다른 이미지를 사용해주세요.");
    },
  });

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) {
      return null;
    }

    try {
      const result = await compressImage(imageFile);
      mutate({ avatar: result });
    } catch (e: any) {
      return toast.error(t(e?.message));
    } finally {
      ref.current!.value = "";
    }
  };

  return (
    <Col className={"gap-4"}>
      <Label font={"heading6"}>Your Avatar</Label>
      <Row className={"items-center gap-6"}>
        <input ref={ref} type="file" hidden onChange={fileChangeHandler} accept="image/png, image/jpeg" />
        <UserAvatar
          className={"h-20 w-20"}
          alt={user.icon}
          src={user.icon}
          fbText={user.id.slice(0, 2).toUpperCase()}
        />
        <Col className={"gap-1"}>
          <Row className="h-[13px] items-center">
            <Row className="h-1 w-1 rounded-[999px] bg-foreground"></Row>
            <p className="body7 ml-1">JPEG, PNG 형식의 파일</p>
          </Row>
          <Row className="h-[13px] items-center">
            <Row className="h-1 w-1 rounded-[999px] bg-foreground"></Row>
            <p className="body7 ml-1">최대 용량 5MB 미만</p>
          </Row>
          <Row className="h-[13px] items-center">
            <Row className="h-1 w-1 rounded-[999px] bg-foreground"></Row>
            <p className="body7 ml-1">추천 사이즈: 300 × 300</p>
          </Row>
        </Col>
        <Button
          variant={"primary"}
          font={"body4"}
          className={"rounded-[5px] px-4"}
          loading={isPending}
          onClick={() => ref.current?.click()}
        >
          Edit
        </Button>
      </Row>
    </Col>
  );
}
