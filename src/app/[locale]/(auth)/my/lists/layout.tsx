import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import Row from "@/components/Layout/Row";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Main>
      <Contents>
        <Row className={"w-full justify-evenly"}>{children}</Row>
      </Contents>
    </Main>
  );
}
