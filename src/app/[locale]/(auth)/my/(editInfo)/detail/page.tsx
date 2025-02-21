import React, { Suspense } from "react";
import Loading from "@/app/[locale]/loading";
import EditMyPage from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditMyPage";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <EditMyPage />
    </Suspense>
  );
}
