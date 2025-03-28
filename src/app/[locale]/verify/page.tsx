import { Row, ContentWrapper, PageWrapper } from "@/components/layout";
import { checkSession } from "@/service/email-verification.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ subject: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function VerifyPage({ params: _params, searchParams }: PageProps) {
  const { token, type, email } = await searchParams;
  if (!token || !type || !email) {
    notFound();
  }
  try {
    await checkSession({ token, type, email });
    return (
      <PageWrapper className={"h-[80dvh]"}>
        <ContentWrapper className={"h-full"}>
          <Row className={"h-full w-full items-center justify-center"}>ddd</Row>
        </ContentWrapper>
      </PageWrapper>
    );
  } catch {
    notFound();
  }
}
