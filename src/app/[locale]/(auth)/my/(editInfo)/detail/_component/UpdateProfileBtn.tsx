import { Link, MyProfile, updateMyProfile } from "@/service/user-service";
import { useTranslation } from "@/app/i18n/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IException } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import React from "react";

export function UpdateProfileBtn({
  profile,
  links,
  setError,
  initError,
}: {
  profile: Omit<MyProfile, "id" | "links">;
  links: Link[];
  setError: any;
  initError: any;
}) {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      toast.success("Profile 업로드 성공!!");
    },
    onError: (e: IException) => {
      const message = e.message;
      if (message.includes("username")) {
        setError((prev: any) => {
          return { ...prev, username: t(message) };
        });
      }
    },
  });

  const onclickHandler = () => {
    let hasError = false;
    const newError = JSON.parse(JSON.stringify(initError));

    if (!profile.displayName) {
      newError.displayName = t("error.data.required_fields_missing");
      hasError = true;
    }
    if (!profile.username) {
      newError.username = t("error.data.required_fields_missing");
      hasError = true;
    }

    links.forEach((link, i) => {
      newError.links[i] = { url: "", label: "" };

      if (!link.url) {
        newError.links[i].url = t("error.data.required_fields_missing");
        hasError = true;
      } else if (!link.url.startsWith("https://")) {
        newError.links[i].url = t("error.data.invalid_format");
        hasError = true;
      }

      if (!link.label) {
        newError.links[i].label = t("error.data.required_fields_missing");
        hasError = true;
      }
    });

    if (hasError) {
      return setError(newError);
    }
    mutate({ ...profile, links });
  };

  return (
    <Button
      loading={isPending}
      variant={"primary"}
      className={"rounded-[5px] px-5"}
      font={"body4"}
      onClick={onclickHandler}
    >
      Save
    </Button>
  );
}
