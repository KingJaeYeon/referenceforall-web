import { Col,Text } from "@/components/layout";
import { SearchInput } from "@/app/[locale]/search/_component/SearchInput";
import ScrollTabs, { Tab } from "@/components/ScrollTabs";
import TabContent from "@/app/[locale]/search/[subject]/_component/TabContent";
import NavContent from "@/app/[locale]/search/[subject]/_component/NavContent";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";

export const revalidate = 15;

export function generateStaticParams() {
  return ["sites", "tags"].map((subject) => ({ subject }));
}

interface PageProps {
  params: Promise<{ subject: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ params: _params, searchParams }: PageProps) {
  const query = await searchParams;

  return {
    title: "Search - " + query.q,
    description: "Search - " + query.q,
  };
}

const tags = [
  { id: 1, value: "react", count: 100 },
  { id: 2, value: "javascript", count: 100 },
  { id: 3, value: "typescript", count: 100 },
  { id: 4, value: "nodejs", count: 100 },
  { id: 5, value: "python", count: 100 },
  { id: 6, value: "machine-learning", count: 100 },
  { id: 7, value: "data-science", count: 100 },
  { id: 8, value: "artificial-intelligence", count: 100 },
  { id: 9, value: "web-development", count: 100 },
  { id: 10, value: "mobile-development", count: 100 },
  { id: 11, value: "cloud-computing", count: 100 },
  { id: 12, value: "devOps", count: 100 },
  { id: 13, value: "blockchain", count: 100 },
  { id: 14, value: "cybersecurity", count: 100 },
  { id: 15, value: "ux-ui-design", count: 100 },
  { id: 16, value: "react-native-development", count: 100 },
  { id: 17, value: "react-components", count: 100 },
  { id: 18, value: "react-query", count: 100 },
  { id: 19, value: "react-forms", count: 100 },
  { id: 20, value: "react-spring", count: 100 },
  { id: 21, value: "cloud-computing", count: 100 },
  { id: 22, value: "devOps", count: 100 },
  { id: 23, value: "blockchain", count: 100 },
  { id: 24, value: "cybersecurity", count: 100 },
  { id: 25, value: "ux-ui-design", count: 100 },
  { id: 26, value: "react-native-development", count: 100 },
  { id: 27, value: "react-components", count: 100 },
  { id: 28, value: "react-query", count: 100 },
  { id: 29, value: "react-forms", count: 100 },
  { id: 30, value: "react-spring", count: 100 },
];

const sites = {
  sites: [
    {
      id: randomUUID(),
      name: "Medium",
      description: "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
      watchList: 100,
      comments: 20,
    },
    {
      id: randomUUID(),
      name: "Medium",
      description: "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl:
        "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
      watchList: 100,
      comments: 20,
    },
    {
      id: randomUUID(),
      name: "사이트 이름",
      description: "이 사이트는 멋진 서비스를 제공하는 웹사이트입니다. 다양한 기능을 체험해보세요.",
      imageUrl: null,
      tags: ["태그1", "태그2", "태그3"],
      rating: 4.5,
      visitors: "1.2K",
      lastUpdate: "2024-03-15",
      watchList: 100,
      comments: 20,
    },
  ],
  total: 3,
};

const getTempData = (subject: string) => {
  let main;
  let nav;
  switch (subject) {
    case "tags":
      main = tags;
      nav = sites;
      return { main, nav };
    case "sites":
      main = sites;
      nav = tags;
      return { main, nav };
    default:
      return null;
  }
};

export default async function SearchesPage(props: PageProps) {
  const params = await props.params;
  const subject = decodeURI(params.subject);
  const searchParams = await props.searchParams;
  const lng = params.locale;

  const paths: Tab[] = [
    { url: `/${lng}/search/sites`, label: "Sites" },
    { url: `/${lng}/search/tags`, label: "Tags" },
  ];

  if (!searchParams.q) {
    return redirect(`/${params.locale}/search`);
  }
  const search = decodeURI(searchParams.q);
  let data = getTempData(subject);

  return (
    <>
      <Col className={"mx-0 mb-[100px] w-full max-w-[680px] gap-[8px] md:mx-[24px] md:mt-[52px] md:gap-0"}>
        <Col>
          <Text
            className={
              "ellipsisLine1 heading1 mb-[12px] mt-[24px] min-h-[30px] font-medium text-gray-400 md:my-0 md:min-h-[52px] md:text-[42px]"
            }
          >
            {"Results for "}
            <span className={"text-black"}>{search}</span>
          </Text>
          <SearchInput subject={subject}/>
        </Col>
        <Col className={"items-center"}>
          <ScrollTabs query={search} tabs={paths} />
          <TabContent target={subject} data={data?.main} />
        </Col>
      </Col>
      <Col
        className={"hidden h-[100dvh] w-full max-w-[320px] border-l border-gray-200 ls:flex"}
        style={{
          paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
          paddingRight: "24px",
        }}
      >
        <NavContent target={subject} data={data?.nav} />
      </Col>
    </>
  );
}
