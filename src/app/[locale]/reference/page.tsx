import Main from "@/components/Layout/Main";
import Contents from "@/components/Layout/Contents";
import ReferencePage from "@/app/[locale]/reference/_component/ReferencePage";

export default function Page() {
  return (
    <Main>
      <Contents>
        <ReferencePage />
      </Contents>
    </Main>
  );
}
