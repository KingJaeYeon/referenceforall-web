import { MyProfile } from "@/service/user.service";
import React from "react";
import { useTranslation } from "@/app/i18n/client";
import { Col, Row } from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Tip from "@/app/components/Tip";
import { Textarea } from "@/components/ui/textarea";
import { errorType } from "@/app/[locale]/(main)/(protected)/my/(profile)/detail/_component/EditProfilePage";

export function EditProfile({
  error,
  profile,
  handleNameChange,
}: {
  error: errorType;
  profile: Omit<MyProfile, "links" | "id">;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
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
          <Tip>{t("error.data.invalid_length", { cnt: 4 })}</Tip>
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
    </React.Fragment>
  );
}
