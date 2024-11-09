import Component from "@/app/[locale]/site/[siteId]/_component/Component";
import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";

export default function Page() {
  return (
    <Main>
      <Contents>
        <Component />
      </Contents>
    </Main>
  );
}
