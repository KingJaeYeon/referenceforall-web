import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import { SelectLangModalTrigger } from "@/components/modal/SelectLangModal";
import NavLink from "@/components/NavLink";
import AuthButton from "@/components/AuthButton";

export default function NavigationHeader({ user }: { user: any }) {
  return (
    <div
      className={
        "sticky left-0 top-0 z-[50] hidden h-[60px] w-full items-center justify-between border-b border-gray-300 bg-transparent bg-opacity-95 px-8 backdrop-blur md:flex"
      }
    >
      <Logo />
      <Row className={"body5 hidden items-center gap-[6px] md:flex"}>
        <NavLink href={"/tag"}>리스트</NavLink>
        <NavLink href={"/share"}>공유하기</NavLink>
        <NavLink href={"/my/lists"}>관심목록</NavLink>
        <SelectLangModalTrigger />
        <AuthButton isLogin={!!user} />
      </Row>
    </div>
  );
}
