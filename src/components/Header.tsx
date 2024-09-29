import MediaWrapper from "@/components/MediaWrapper";
import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import Text from "@/components/Layout/Text";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SelectLangModal from "@/components/SelectLangModal";
import Image from "next/image";

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
      className={"flex h-[60px] items-center justify-between bg-red-50 px-4"}
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
        "sticky left-0 top-0 z-[100] flex h-[60px] w-full items-center justify-between bg-opacity-95 px-8 backdrop-blur"
      }
    >
      <Logo />
      <Row className={"body5 items-center gap-[6px]"}>
        <Link
          href={"/reference"}
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
        <SelectLangModal>
          <Row className={"w-fit cursor-pointer gap-1"}>
            <Row className={"items-center gap-[3px]"}>
              <Image
                // src={getImage(i18n?.language)}
                src={"/images/KR.svg"}
                alt={"i18n.language"}
                width={24}
                height={24}
              />
              <Text className={"body4 text-foreground"}>{"한국어"}</Text>
            </Row>
          </Row>
        </SelectLangModal>
        <Button variant={"default"} font={"heading6"}>
          로그인
        </Button>
      </Row>
    </header>
  );
}
