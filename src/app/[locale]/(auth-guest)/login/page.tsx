import PageWrapper from "@/components/Layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/app/[locale]/(auth-guest)/login/_component/LoginForm";
import Link from "next/link";
import Row from "@/components/Layout/Row";
import { getTranslation } from "@/app/i18n";

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await getTranslation(locale);
  return (
    <PageWrapper className={"justify-center pb-[100px] pt-[50px] md:min-h-[calc(100vh-60px)] md:bg-[#f0f4f9]"}>
      <Row className={"h-full w-full items-center justify-evenly"}>
        <Card className="w-full p-4 md:max-w-md" onlyMobile>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">{t("login")}</CardTitle>
          </CardHeader>
          <CardContent className={"space-y-4 px-0"}>
            <LoginForm />
            <div className="text-center">
              <Link className="text-sm text-blue-600 hover:text-blue-800" href={"/signup"}>
                {t("no_account_signup")}
              </Link>
            </div>
          </CardContent>
        </Card>
      </Row>
    </PageWrapper>
  );
}
