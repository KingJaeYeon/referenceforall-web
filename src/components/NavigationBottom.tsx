import BottomTabLink from "@/components/BottomTabLink";
import {
  BookmarkIcon,
  LibrarySquareIcon,
  ListIcon,
  Share2Icon,
} from "lucide-react";
import { IconSearch } from "@/assets/svg";
import UserAvatar from "@/components/UserAvatar";

export default function NavigationBottom() {
  return (
    <header
      className={
        "fixed bottom-0 left-0 z-[50] flex h-full max-h-[65px] w-full items-center justify-between border-t border-gray-300 bg-background px-8 md:hidden"
      }
    >
      <BottomTabLink icon={<ListIcon />} href={"/tag"}>
        리스트
      </BottomTabLink>
      <BottomTabLink icon={<IconSearch />} href={"/search"}>
        검색하기
      </BottomTabLink>
      <BottomTabLink icon={<Share2Icon />} href={"/share"}>
        공유하기
      </BottomTabLink>
      <BottomTabLink icon={<BookmarkIcon />} href={["/my/lists", "/@"]}>
        관심목록
      </BottomTabLink>
      <BottomTabLink
        icon={<UserAvatar className={"h-[24px] w-[24px]"} />}
        href={"/my/setting"}
      >
        내정보
      </BottomTabLink>
    </header>
  );
}
