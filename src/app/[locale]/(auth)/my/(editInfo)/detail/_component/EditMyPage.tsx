"use client";
import { Col, Row } from "@/components/layout";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile, Link, MyProfile, updateMyProfile } from "@/service/user-service";
import React, { useEffect, useState } from "react";
import { EditAvatar } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditAvatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { IException } from "@/lib/axios";
import { toast } from "sonner";
import { useTranslation } from "@/app/i18n/client";
import { Tooltip } from "@/components/ui/tooltip";
import Tip from "@/app/components/Tip";

const initError = {
  displayName: "",
  username: "",
  links: [{ label: "", url: "" }],
};

export default function EditMyPage() {
  const { data } = useSuspenseQuery({
    queryFn: fetchMyProfile,
    queryKey: ["my-profile"],
  });

  const [profile, setProfile] = useState<Omit<MyProfile, "links" | "id">>({
    displayName: "",
    bio: "",
    username: "",
  });
  const [error, setError] = useState(initError);
  const { t } = useTranslation();
  const [links, setLinks] = useState<Link[] | []>([]);

  useEffect(() => {
    const { links, id, ...other } = data;
    setProfile(other);
    setLinks(links);
    setError({ ...error, links: links.map(() => ({ label: "", url: "" })) });
  }, [data]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setProfile((prev: any) => {
      if (!prev) return null;
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const addLink = () => {
    if (links.length >= 5) return;
    setLinks([...links, { url: "", label: "" }]);
    setError((prevError) => ({
      ...prevError,
      links: [...prevError.links, { url: "", label: "" }],
    }));
  };
  const removeLink = (index: number) => {
    setLinks(links.filter((_: any, i: number) => i !== index));
    setError((prevError) => ({
      ...prevError,
      links: prevError.links.filter((_, i) => i !== index),
    }));
  };

  const setValues = (index: number, key: string, value: string) => {
    setLinks(
      links.map((link, i) => {
        if (i === index) {
          return { ...link, [key]: value };
        }
        return link;
      }),
    );
  };

  return (
    <Col className={"w-full justify-between gap-10 pb-[100px]"}>
      <Col className={"gap-6"}>
        <p className={"heading2"}>Profile</p>
        <EditAvatar />
        <Col className={"gap-2"}>
          <Label font={"heading6"} htmlFor={"displayName"}>
            Display name
          </Label>
          <Input
            id={"displayName"}
            hasError={!!error.displayName}
            value={profile?.displayName ?? ""}
            maxLength={20}
            icon={"length"}
            onChange={(e) => handleNameChange(e, "displayName")}
          />
          {error.displayName && <p className={"body7 pl-2 text-destructive"}>{error.displayName}</p>}
        </Col>
        <Col className={"gap-2"}>
          <Row className={"items-center gap-1"}>
            <Label font={"heading6"}>Username</Label>
            <Tip>{t("error.auth.username_invalid", { cnt: 4 })}</Tip>
          </Row>
          <Input
            value={profile?.username ?? ""}
            maxLength={50}
            hasError={!!error.username}
            icon={"length"}
            onChange={(e) => handleNameChange(e, "username")}
          />
          {error.username && <p className={"body7 pl-2 text-destructive"}>{error.username}</p>}
        </Col>
        <Col className={"gap-2"}>
          <Label font={"heading6"}>Bio</Label>
          <Textarea
            value={profile?.bio ?? ""}
            onChange={(e) => handleNameChange(e, "bio")}
            maxLength={200}
            showMaxLength
          />
        </Col>
      </Col>
      <Col className={"gap-6"}>
        <p className={"heading2"}>{`Additional links ${links.length}/5`}</p>
        {links?.map((link: { url: string; label: string }, index: number) => (
          <Row className={"gap-2"} key={index}>
            <Col className={"flex-1 gap-2"}>
              <Label font={"heading6"}>Link name</Label>
              <Input
                placeholder={"Label to Link"}
                value={link.label}
                hasError={!!error.links[index].label}
                onChange={(e) => setValues(index, "label", e.target.value.trim())}
              />
              {error.links[index].label && <p className={"body7 pl-2 text-destructive"}>{error.links[index].label}</p>}
            </Col>
            <Col className={"flex-[3] gap-2"}>
              <Label font={"heading6"}>URL</Label>
              <Row className={"gap-2"}>
                <Input
                  value={link.url}
                  hasError={!!error.links[index].url}
                  placeholder={"https://example.com/ex"}
                  onChange={(e) => setValues(index, "url", e.target.value.trim())}
                />
                <Button
                  color={"secondary"}
                  onClick={() => removeLink(index)}
                  className={"h-full px-[10px] md:px-[15px]"}
                >
                  <Trash size={20} />
                </Button>
              </Row>
              {error.links[index].url && <p className={"body7 pl-2 text-destructive"}>{error.links[index].url}</p>}
            </Col>
          </Row>
        ))}
        {links.length < 5 && (
          <Button className={"rounded-[4px]"} font={"body4"} onClick={addLink}>
            Add Link <Plus size={20} className={"ml-[6px]"} />
          </Button>
        )}
      </Col>
      <Row>
        <UpdateProfileBtn profile={profile} links={links} setError={setError} initError={initError} />
      </Row>
    </Col>
  );
}

function UpdateProfileBtn({
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
