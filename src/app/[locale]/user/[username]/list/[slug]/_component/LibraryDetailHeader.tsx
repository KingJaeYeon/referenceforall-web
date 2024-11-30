import Text from "@/components/Layout/Text";
import { CreateNewListModalTrigger } from "@/components/modal/CreateNewListModal";
import UserAvatar from "@/components/UserAvatar";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import { utilDate } from "@/lib/dateFormat";
import { LockIcon } from "lucide-react";

export default function LibraryDetailHeader({
  detail,
  locale,
}: {
  detail: any;
  locale: string;
}) {
  return (
    <header className={"flex min-h-[42px] flex-col"}>
      <Row className={"mb-[24px] mt-[32px] h-[48px] items-center"}>
        <UserAvatar className={"mr-4 h-12 w-12"} />
        <Col className={"h-full justify-between"}>
          <Text className={"body3 h-6"}>{detail.title}</Text>
          <Row className={"body5 h-[22px] items-center text-gray-500"}>
            <Text className={"h-[18px]"}>
              {utilDate({ date: detail.createdAt, locale, isFull: true })}
            </Text>
            <span className={"mx-1.5 mb-1"}>.</span>
            <Text className={"mr-1.5 h-[18px]"}>{detail.total} lists</Text>
            <LockIcon className={"mt-0.5 h-3 w-3"} />
          </Row>
        </Col>
      </Row>
      <Text
        className={
          "ellipsisLine1 heading1 min-h-[30px] text-[32px] font-semibold text-black md:min-h-[52px]"
        }
      >
        {detail.title}
      </Text>
      <CreateNewListModalTrigger />
    </header>
  );
}
