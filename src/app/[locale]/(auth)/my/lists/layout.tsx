import React from "react";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Row from "@/components/Layout/Row";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Contents>
        <Row className={"w-full justify-evenly"}>{children}</Row>
      </Contents>
    </Main>
  );
}
