import SitePage from "@/app/[locale]/site/[siteId]/_component/SitePage";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";

export default function Page() {
  return (
    <Main>
      <Contents>
        <SitePage />
      </Contents>
    </Main>
  );
}
