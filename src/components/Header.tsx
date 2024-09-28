import MediaWrapper from "@/components/MediaWrapper";
import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";

export default function Header() {
  return (
    <header className={"tb:justify-center justify-between"}>
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
    <div>
      <h1>MobileMenu</h1>
    </div>
  );
}

function DesktopMenu() {
  return (
    <Row
      className={"sticky left-0 top-0 h-[60px] w-full items-center bg-red-50"}
    >
      <Logo />
      <span></span>
    </Row>
  );
}
