"use client";
import { Col, Row } from "@/components/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile, MyProfile } from "@/service/user-service";
import React, { useEffect, useState } from "react";
import { EditAvatar } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditAvatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export default function EditMyPage() {
  const { data } = useSuspenseQuery({
    queryFn: fetchMyProfile,
    queryKey: ["my-profile"],
  });

  const [profile, setProfile] = useState<any>(null);
  const [links, setLinks] = useState<any>([]);

  useEffect(() => {
    const { links, id, ...other } = data;
    setProfile(other);
    setLinks(links);
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
  };
  const removeLink = (index: number) => setLinks(links.filter((_: any, i: number) => i !== index));

  return (
    <Col className={"w-full justify-between gap-10 pb-[100px]"}>
      <Col className={"gap-6"}>
        <p className={"heading2"}>Profile</p>
        <EditAvatar />
        <Col className={"gap-2"}>
          <Label font={"heading6"}>Display name</Label>
          <Input
            value={profile?.displayName ?? ""}
            maxLength={20}
            icon={"length"}
            onChange={(e) => handleNameChange(e, "displayName")}
          />
        </Col>
        <Col className={"gap-2"}>
          <Label font={"heading6"}>Username</Label>
          <Input
            value={profile?.username ?? ""}
            maxLength={50}
            icon={"length"}
            onChange={(e) => handleNameChange(e, "username")}
          />
        </Col>
        <Col className={"gap-2"}>
          <Label font={"heading6"}>Email</Label>
          <Input value={profile?.email ?? ""} onChange={(e) => handleNameChange(e, "email")} />
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
              <Input placeholder={"Label to Link"} value={link.label} onChange={(e) => handleNameChange(e, "email")} />
            </Col>
            <Col className={"flex-[3] gap-2"}>
              <Label font={"heading6"}>URL</Label>
              <Row className={"gap-2"}>
                <Input
                  value={link.url}
                  placeholder={"https://example.com/ex"}
                  onChange={(e) => handleNameChange(e, "email")}
                />
                <Button
                  color={"secondary"}
                  onClick={() => removeLink(index)}
                  className={"h-full px-[10px] md:px-[15px]"}
                >
                  <Trash size={20} />
                </Button>
              </Row>
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
        <Button variant={"primary"} className={"rounded-[5px] px-5"} font={"body4"}>
          Save
        </Button>
      </Row>
    </Col>
  );
}
