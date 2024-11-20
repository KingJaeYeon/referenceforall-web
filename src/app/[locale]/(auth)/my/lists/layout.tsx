import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Row from "@/components/Layout/Row";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch your Library",
  description: "Watch your Library",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Main>
      <Contents>
        <Row className={"w-full justify-evenly"}>{children}</Row>
      </Contents>
    </Main>
  );
}
