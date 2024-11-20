import SitePage from "@/app/[locale]/site/[siteId]/_component/SitePage";
import PageWrapper from "@/components/Layout/PageWrapper";
import ContentWrapper from "@/components/Layout/ContentWrapper";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ siteId: string; locale: string }>;
}

export async function generateMetadata({ params: _params }: PageProps) {
  const params = await _params;
  const siteId = decodeURI(params.siteId);

  // 사이트 가져오는 로직

  // if (!siteId) {
  //   notFound();
  // }

  return {
    title: "Site Details - " + siteId,
    description: "Site Details  - " + siteId,
  };
}

export default function SiteDetailsPage() {
  return (
    <PageWrapper>
      <ContentWrapper>
        <SitePage />
      </ContentWrapper>
    </PageWrapper>
  );
}
