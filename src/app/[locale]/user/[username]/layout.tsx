import { ContentWrapper ,PageWrapper} from "@/components/layout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </PageWrapper>
  );
}
