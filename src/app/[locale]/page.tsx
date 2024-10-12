import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";

export default function Home() {
  const t = useTranslations();
  return (
    <Main>
      <Contents>
        <section className="bg-gray-50 pt-12 sm:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Col className="mx-auto max-w-2xl text-center">
              <h1 className="px-6 text-lg text-gray-600">{t("main_theme")}</h1>
              <Text className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:w-[700px] sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
                {t("main_title")}
              </Text>

              <div className="mt-9 px-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 sm:px-0">
                <Link
                  href="/reference"
                  title=""
                  className="font-pj inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent bg-gray-900 px-8 py-3 text-lg font-bold text-white transition-all duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:w-auto"
                  role="button"
                >
                  {t("find_site")}
                </Link>

                <Link
                  href="/share"
                  title=""
                  className="font-pj mt-4 inline-flex w-full items-center justify-center rounded-xl border-2 border-gray-400 px-6 py-3 text-lg font-bold text-gray-900 transition-all duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus:border-gray-900 focus:bg-gray-900 focus:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                  role="button"
                >
                  <svg
                    className="mr-2 h-5 w-5"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t("share_site")}
                </Link>
              </div>

              <p className="font-inter mt-8 text-base text-gray-500">
                {t("main_desc")}
              </p>
            </Col>
          </div>

          <div className="bg-white pb-12">
            <div className="relative">
              <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
              <div className="relative mx-auto">
                <div className="lg:mx-auto lg:max-w-6xl">
                  <img
                    className="scale-110 transform"
                    src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Contents>
    </Main>
  );
}
