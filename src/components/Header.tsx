import MediaWrapper from "@/components/MediaWrapper";
import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import Text from "@/components/Layout/Text";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className={"h-[60px] bg-red-50"}>
      <MediaWrapper type={"mb"} isReverse={true}>
        <DesktopMenu />
      </MediaWrapper>
      <MediaWrapper type={"mb"}>
        <MobileMenu />
      </MediaWrapper>
    </header>
  );
}

function MobileMenu() {
  return (
    <Row className={"h-full items-center justify-between px-4"}>
      <Logo />
      <h1>MobileMenu</h1>
    </Row>
  );
}

function DesktopMenu() {
  return (
    <Row
      className={
        "sticky left-0 top-0 h-full w-full items-center justify-between px-8"
      }
    >
      <Logo />
      <Row className={"body5 items-center gap-[13px]"}>
        <Text>리스트</Text>
        <Text>공유하기</Text>
        <Text>관심목록</Text>
        <Button variant={"ghost"} className={"heading1"}>
          로그인
        </Button>
      </Row>
    </Row>
  );
}
