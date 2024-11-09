import MediaWrapper from "@/components/MediaWrapper";
import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SelectLangModal from "@/components/SelectLangModal";
import { Link } from "@/i18n/routing";

export default function Header() {
  return (
    <>
      <MediaWrapper type={"mb"} isReverse={true}>
        <DesktopMenu />
      </MediaWrapper>
      <MediaWrapper type={"mb"}>
        <MobileMenu />
      </MediaWrapper>
    </>
  );
}

function MobileMenu() {
  return (
    <header
      className={"bg-red-50 flex h-[60px] items-center justify-between px-4"}
    >
      <Logo />
      <h1>MobileMenu</h1>
    </header>
  );
}

function DesktopMenu() {
  return (
    <header
      className={
        "sticky left-0 top-0 z-[50] flex h-[60px] w-full items-center justify-between border-b border-gray-300 bg-opacity-95 px-8 backdrop-blur"
      }
    >
      <Logo />
      <Row className={"body5 items-center gap-[6px]"}>
        <Link
          href={"/tag"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              rounded: "full",
              className: "px-3 py-2",
            }),
          )}
        >
          리스트
        </Link>
        <Link
          href={"/share"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              rounded: "full",
              className: "px-3 py-2",
            }),
          )}
        >
          공유하기
        </Link>
        <Link
          href={"/watchlist"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              rounded: "full",
              className: "px-3 py-2",
            }),
          )}
        >
          관심목록
        </Link>
        <SelectLangModal />

        <Button variant={"default"} font={"heading6"}>
          로그인
        </Button>
      </Row>
    </header>
  );
}
