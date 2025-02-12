import PageWrapper from "@/components/Layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/app/[locale]/(auth-guest)/login/_component/LoginForm";
import { Link } from "@/i18n/routing";
import Row from "@/components/Layout/Row";

export default function Page() {
  return (
    <PageWrapper className={"justify-center pb-[100px] pt-[50px] md:min-h-[calc(100vh-60px)] md:bg-[#f0f4f9]"}>
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="w-full p-4 md:max-w-md" onlyMobile>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">로그인</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4 px-0"}>
            <LoginForm />

            <div className="text-center">
              <Link className="text-sm text-blue-600 hover:text-blue-800" href={"/signup"}>
                계정이 없으신가요? 회원가입
              </Link>
            </div>
          </CardContent>
        </Card>
      </Row>
    </PageWrapper>
  );
}
