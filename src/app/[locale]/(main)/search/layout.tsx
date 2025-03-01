import { PageWrapper,Row ,ContentWrapper} from "@/components/layout";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <ContentWrapper>
        <Row className={"w-full justify-evenly"}>{children}</Row>
      </ContentWrapper>
    </PageWrapper>
  );
}
