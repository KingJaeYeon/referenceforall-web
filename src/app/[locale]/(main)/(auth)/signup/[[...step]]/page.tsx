import SignupForm from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/SignupForm";
import { PageWrapper ,Row} from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { notFound } from "next/navigation";
import { isValidStep } from "@/app/[locale]/(main)/(auth)/signup/[[...step]]/_component/util";

interface PageProps {
  params: Promise<{ step?: string[] }>;
}

export default async function SignupPage(props: PageProps) {
  const params = await props.params;
  const step = params.step || [];

  if (!isValidStep(step)) {
    notFound(); // 허용되지 않은 경로는 404로 처리
  }

  return (
    <PageWrapper className="justify-center pb-[100px] pt-[50px] md:min-h-[calc(100vh-60px)] md:bg-[#f0f4f9] md:px-4">
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="z-0 w-full overflow-hidden p-4 md:max-w-[62rem] md:p-10" onlyMobile>
          <div className={"pt-4"}>
            <Logo className={"h-[40px] w-[37px]"} />
          </div>
          <SignupForm step={step[0]} />
        </Card>
      </Row>
    </PageWrapper>
  );
}
