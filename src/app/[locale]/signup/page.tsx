import PageWrapper from "@/components/Layout/PageWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Row from "@/components/Layout/Row";
import SignupForm from "@/app/[locale]/signup/_component/SignupForm";

export default function Page() {
  return (
    <PageWrapper className={"h-[80vh]"}>
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="w-full md:max-w-md" onlyMobile>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-bold">회원가입</CardTitle>
            <CardDescription className="text-center">
              아래 정보를 입력하여 계정을 생성하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </Row>
    </PageWrapper>
  );
}
