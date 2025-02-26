"use client";
import { Col, Row } from "@/components/layout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile, Link as ILink, MyProfile } from "@/service/user-service";
import React, { useEffect, useState } from "react";
import { EditAvatar } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditAvatar";
import { UpdateProfileBtn } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/UpdateProfileBtn";
import { EditProfile } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditProfile";
import { EditLinks } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditLinks";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import NavLink from "@/components/NavLink";

const initError = {
  displayName: "",
  username: "",
  links: [{ label: "", url: "" }],
};

export type errorType = typeof initError;

export default function EditProfilePage() {
  const { data } = useSuspenseQuery({
    queryFn: fetchMyProfile,
    queryKey: ["my-profile"],
  });

  const [profile, setProfile] = useState<Omit<MyProfile, "links" | "id">>({
    displayName: "",
    bio: "",
    username: "",
  });
  const [error, setError] = useState<errorType>(initError);
  const [links, setLinks] = useState<ILink[] | []>([]);

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

  return (
    <Col className={"w-full justify-between gap-10 pb-[100px]"}>
      <Col className={"gap-6"}>
        <p className={"heading2"}>Profile</p>
        <Col className={"justify-between gap-4 md:flex-row md:items-end"}>
          <EditAvatar />
          <NavLink className={"heading6 rounded-[5px] bg-gray-200 px-4 py-3 font-medium"}  href={`/@${profile.displayName}`}>
            View my profile
          </NavLink>
        </Col>
        <EditProfile profile={profile} error={error} handleNameChange={handleNameChange} />
      </Col>
      <EditLinks setLinks={setLinks} links={links} setError={setError} error={error} />
      <Row>
        <UpdateProfileBtn profile={profile} links={links} setError={setError} initError={initError} />
      </Row>
    </Col>
  );
}
