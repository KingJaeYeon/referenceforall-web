import Text from "@/components/Layout/Text";
import { CreateNewListModalTrigger } from "@/components/modal/CreateNewListModal";

export default function LibraryHeader() {
  return (
    <header
      className={
        "mb-[6px] mt-[24px] flex h-[42px] items-center justify-between md:mb-[12px] md:mt-0"
      }
    >
      <Text
        className={
          "ellipsisLine1 heading1 min-h-[30px] font-medium text-black md:min-h-[52px] md:text-[42px]"
        }
      >
        {"Your library"}
      </Text>
      <CreateNewListModalTrigger />
    </header>
  );
}
