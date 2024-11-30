import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import LibraryDetailHeader from "@/app/[locale]/user/[username]/list/[slug]/_component/LibraryDetailHeader";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    locale: string;
    username: string;
    slug: string;
  }>;
}
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  // Your metadata generation logic here
  const username = decodeURIComponent(params.username).slice(1);
  const slug = decodeURI(params.slug).split("-").join(" ").toLocaleUpperCase();
  return {
    title: `${username} - ${slug}`,
  };
}

export default async function UserPage(props: PageProps) {
  const detail = {
    id: "a",
    username: "Wodus331",
    createdAt: "2024-12-01",
    isPrivate: true,
    title: "2024 여행 버킷리스트",
    total: 10,
    description: "",
    list: [{}],
  };

  const params = await props.params;

  const { locale } = params;

  return (
    <Row className={"w-full justify-evenly"}>
      <Col className={"mx-0 w-full max-w-[680px]"}>
        <LibraryDetailHeader detail={detail} locale={locale} />
      </Col>
      <Col
        className={
          "hidden h-auto w-full max-w-[320px] border-l border-gray-200 ls:flex"
        }
        style={{
          paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
          paddingRight: "24px",
        }}
      ></Col>
    </Row>
  );
}
