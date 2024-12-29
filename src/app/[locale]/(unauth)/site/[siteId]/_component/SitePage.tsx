"use client";
import { useState } from "react";
import MediaWrapper from "@/components/MediaWrapper";
import {
  DesktopMain,
  MobileMain,
} from "@/app/[locale]/(unauth)/site/[siteId]/_component/Main";

export default function SitePage({
  comments,
  siteData,
}: {
  comments: any;
  siteData: any;
}) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <>
      <MediaWrapper type={"mb"} isReverse={true}>
        <DesktopMain
          siteData={siteData}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          comments={comments}
        />
      </MediaWrapper>
      <MediaWrapper type={"mb"}>
        <MobileMain
          siteData={siteData}
          isBookmarked={isBookmarked}
          setIsBookmarked={setIsBookmarked}
          comments={comments}
        />
      </MediaWrapper>
    </>
  );
}
