import Text from "@/components/Layout/Text";
import UserAvatar from "@/components/UserAvatar";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import { utilDate } from "@/lib/dateFormat";
import { LockIcon } from "lucide-react";

export default function LibraryDetailHeader(props: {
  detail: any;
  locale: string;
}) {
  const { locale, detail } = props;
  return (
    <header className={"flex min-h-[42px] flex-col"}>
      <Row className={"mb-[18px] mt-[32px] h-[48px] items-center"}>
        <UserAvatar className={"mr-4 h-12 w-12"} />
        <Col className={"h-full justify-between"}>
          <Text className={"body3 h-6"}>{detail.username}</Text>
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
          "heading1 min-h-[30px] break-all font-semibold text-black sm:text-[28px] md:min-h-[52px] md:text-[32px]"
        }
      >
        {detail.title}
      </Text>
    </header>
  );
}
