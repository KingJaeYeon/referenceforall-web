import { Label } from "@/components/ui/label";
import { Col } from "@/components/layout";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { getTranslation } from "@/app/i18n";

export async function AboutMe({
  aboutMe,
  isMine,
  locale,
  displayName,
}: {
  aboutMe?: string;
  isMine: boolean;
  locale: string;
  displayName: string;
}) {
  const { t } = await getTranslation(locale);
  return (
    <Col className={"mb-10 w-full"}>
      <Label font={"heading6"} className={"font-medium"}>
        {t("aboutme")}
      </Label>
      {isMine && !aboutMe ? (
        <Empty label={t("abountme_empty_mine")} />
      ) : (
        <AboutMeEditor aboutMe={aboutMe} placeholder={t("abountme_empty_other", { displayName })} />
      )}
    </Col>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className={"mt-2 rounded-[5px] bg-gray-100 p-6"}>
      <Link href={"/my/detail"} className={"body4 text-blue-600 underline"}>
        {label}
      </Link>
    </div>
  );
}

function AboutMeEditor({ aboutMe, placeholder }: { aboutMe?: string; placeholder: string }) {
  return (
    <Textarea
      readOnly
      placeholder={placeholder}
      value={aboutMe ?? ""}
      className="mt-[8px] min-h-[100px] resize-none rounded-[3px] px-3 placeholder:text-blue-700"
    />
  );
}
