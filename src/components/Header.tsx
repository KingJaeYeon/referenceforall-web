import MediaWrapper from "@/components/MediaWrapper";
import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SelectLangModal from "@/components/SelectLangModal";
import { Link } from "@/i18n/routing";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Text from "@/components/Layout/Text";
import { useState } from "react";
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
    <header className="flex h-[60px] items-center justify-between border-b bg-white px-4">
      <Logo />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[300px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-left">메뉴</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-2">
            <Link
              href="/tag"
              className="rounded-lg p-3 transition-colors hover:bg-gray-100"
            >
              리스트
            </Link>
            <Link
              href="/share"
              className="rounded-lg p-3 transition-colors hover:bg-gray-100"
            >
              공유하기
            </Link>
            <Link
              href="/library"
              className="rounded-lg p-3 transition-colors hover:bg-gray-100"
            >
              관심목록
            </Link>
            <div className="p-3">
              <SelectLangModal />
            </div>
            <div className="mt-4">
              <Button className="w-full" variant="default">
                로그인
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
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
          검색하기
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
          href={"/library"}
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
