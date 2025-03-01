import { ReactNode, Suspense } from "react";
import { Col ,ContentWrapper,PageWrapper} from "@/components/layout";
import RecommendedTags from "@/app/[locale]/(main)/tag/_component/RecommendedTags";
import { fetchTags } from "@/service/post.service";
import { Loader2 } from "lucide-react";

interface PageProps {
  children: ReactNode;
}

export default async function Layout({ children }: PageProps) {
  const result = await fetchTags({ take: 12, type: "recommend" });
  return (
    <PageWrapper>
      <ContentWrapper>
        <Col className={"text-center"}>
          <Suspense fallback={<Loader2 className={"animate-spin"} />}>
            <RecommendedTags tags={result.data} />
          </Suspense>
          {children}
        </Col>
      </ContentWrapper>
    </PageWrapper>
  );
}
