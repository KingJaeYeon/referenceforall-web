"use client";
import { useState } from "react";
import { DesktopMain, MobileMain } from "@/app/[locale]/(main)/site/[siteId]/_component/Main";

export default function SitePage({ comments, siteData }: { comments: any; siteData: any }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <>
      <DesktopMain
        siteData={siteData}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        comments={comments}
      />
      <MobileMain
        siteData={siteData}
        isBookmarked={isBookmarked}
        setIsBookmarked={setIsBookmarked}
        comments={comments}
      />
    </>
  );
}
