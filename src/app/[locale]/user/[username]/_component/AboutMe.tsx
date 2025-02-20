import { Label } from "@/components/ui/label";
import { Col } from "@/components/layout";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { getTranslation } from "@/app/i18n";

export async function AboutMe({ aboutMe, isMine, locale }: { aboutMe?: string; isMine: boolean; locale: string }) {
  const { t } = await getTranslation(locale);
  return (
    <Col className={"mb-10 w-full"}>
      <Label font={"heading6"} className={"font-medium"}>
        {t("aboutme")}
      </Label>
      {isMine && !aboutMe ? <Empty t={t} /> : <AboutMeEditor aboutMe={aboutMe} t={t} />}
    </Col>
  );
}

function Empty({ t }: { t: any }) {
  return (
    <div className={"mt-2 rounded-[5px] bg-gray-100 p-6"}>
      <Link href={"/my/setting"} className={"body4 text-blue-600 underline"}>
        {t("abountme_empty_mine")}
      </Link>
    </div>
  );
}

function AboutMeEditor({ aboutMe, t }: { aboutMe?: string; t: any }) {
  return (
    <Textarea
      readOnly
      value={aboutMe ? aboutMe : t("abountme_empty_other")}
      className="mt-[8px] min-h-[100px] resize-none rounded-[3px] px-3 placeholder:text-blue-700"
    />
  );
}
