import PageWrapper from "@/components/Layout/PageWrapper";
import { Card } from "@/components/ui/card";
import Row from "@/components/Layout/Row";
import SignupForm from "@/app/[locale]/(auth-guest)/signup/_component/SignupForm";
import { Logo } from "@/components/Logo";

export default function Page() {
  return (
    <PageWrapper className={"h-[80vh] md:px-4"}>
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="w-full px-10 py-4 md:max-w-[52rem]" onlyMobile>
          <div className={"pt-4"}>
            <Logo className={"h-[40px] w-[37px]"} />
          </div>
          <SignupForm />
        </Card>
      </Row>
    </PageWrapper>
  );
}
