import Row from "@/components/Layout/Row";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { SelectLangModalTrigger } from "@/components/modal/SelectLangModal";
import NavLink from "@/components/NavLink";

export default function MainHeader() {
  return (
    <header
      className={
        "absolute bottom-0 h-[60px] w-full items-center justify-between border-b bg-white px-4 md:sticky md:left-0 md:top-0 md:z-[50] md:flex md:border-gray-300 md:bg-transparent md:bg-opacity-95 md:px-8 md:backdrop-blur"
      }
    >
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className={"flex md:hidden"}>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left">메뉴</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-2">
          <NavLink href={"/tag"} className={"rounded-lg p-3 transition-colors"}>
            리스트
          </NavLink>
          <NavLink
            href={"/share"}
            className={"rounded-lg p-3 transition-colors"}
          >
            공유하기
          </NavLink>
          <NavLink
            href={"/my/lists"}
            className={"rounded-lg p-3 transition-colors"}
          >
            관심목록
          </NavLink>
          <div className="p-3">
            <SelectLangModalTrigger />
          </div>
          <div className="mt-4">
            <Button className="w-full" variant="default">
              로그인
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DesktopMenu() {
  return (
    <Row className={"body5 hidden items-center gap-[6px] md:flex"}>
      <NavLink href={"/tag"}>리스트</NavLink>
      <NavLink href={"/share"}>공유하기</NavLink>
      <NavLink href={"/my/lists"}>관심목록</NavLink>
      <SelectLangModalTrigger />
      <Button variant={"default"} font={"heading6"} role={"link"}>
        로그인
      </Button>
    </Row>
  );
}
