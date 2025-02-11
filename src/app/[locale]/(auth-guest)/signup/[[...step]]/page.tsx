import SignupForm from "@/app/[locale]/(auth-guest)/signup/[[...step]]/_component/SignupForm";
import PageWrapper from "@/components/Layout/PageWrapper";
import Row from "@/components/Layout/Row";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { notFound } from "next/navigation";

const ALLOWED_URLS = [undefined, "username", "email", "verify", "password"];

interface PageProps {
  params: Promise<{ step?: string[] }>;
}

export default async function SignupPage(props: PageProps) {
  const params = await props.params;
  const step = params.step || [];

  const IS_ALLOWED_URL = step.length > 1 || (step[0] && !ALLOWED_URLS.includes(step[0]));

  if (IS_ALLOWED_URL) {
    notFound(); // 허용되지 않은 경로는 404로 처리
  }

  return (
    <PageWrapper className={"h-[calc(100vh-60px)] md:bg-[#f0f4f9] md:px-4"}>
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="z-0 w-full px-10 py-4 md:max-w-[52rem] overflow-hidden" onlyMobile>
          <div className={"pt-4"}>
            <Logo className={"h-[40px] w-[37px]"} />
          </div>
          <SignupForm step={step[0]} />
        </Card>
      </Row>
    </PageWrapper>
  );
}
