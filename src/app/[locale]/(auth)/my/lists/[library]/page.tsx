import React from "react";
import MyListPage from "@/app/[locale]/(auth)/my/lists/_component/MyListPage";

interface PageProps {
  params: Promise<{ library: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const library = decodeURI(params.library);

  return <MyListPage library={library} />;
}
