import { Label } from "@/components/ui/label";
import { Col } from "@/components/layout";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export function AboutMe({ aboutMe, isSelf }: { aboutMe?: string; isSelf: boolean }) {
  if (!isSelf && !aboutMe) {
    return;
  }

  return (
    <Col className={"w-full mb-10"}>
      <Label font={"heading6"} className={"font-medium"}>
        ABOUT
      </Label>
      {aboutMe ? <AboutMeEditor aboutMe={aboutMe} /> : <Empty />}
    </Col>
  );
}

function Empty() {
  return (
    <div className={"mt-2 rounded-[5px] bg-gray-100 p-6"}>
      <Link href={'/my/setting'} className={"body4 text-blue-600 underline"}>사람들에게 나를 소개해보세요.</Link>
    </div>
  );
}

function AboutMeEditor({ aboutMe }: { aboutMe: string }) {
  return (
    <Textarea
      readOnly
      value={aboutMe}
      className="mt-[8px] min-h-[100px] resize-none rounded-[3px] px-3 placeholder:text-blue-700"
    />
  );
}
