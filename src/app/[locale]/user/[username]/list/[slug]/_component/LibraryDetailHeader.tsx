import Text from "@/components/Layout/Text";
import UserAvatar from "@/components/UserAvatar";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import { utilDate } from "@/lib/dateFormat";
import { Bookmark, LockIcon, MoreHorizontal } from "lucide-react";
import MobileBackButton from "@/components/MobileBackButton";

export default function LibraryDetailHeader(props: {
  detail: any;
  locale: string;
}) {
  const { locale, detail } = props;
  return (
    <header className={"mb-[48px] flex min-h-[42px] justify-center"}>
      <Col
        className={
          "min-w-[calc(100%+32px)] flex-col-reverse border-b border-gray-200 px-4 pb-4 md:min-w-full md:flex-col md:px-0 md:pb-0"
        }
      >
        <Col>
          <Row
            className={
              "mb-[18px] mt-[12px] h-[48px] items-center md:mb-[32px] md:mt-[56px]"
            }
          >
            <UserAvatar className={"mr-4 h-12 w-12"} />
            <Col className={"h-full justify-between"}>
              <Text className={"body3 h-6"}>{detail.username}</Text>
              <Row className={"body5 h-[22px] items-center text-gray-500"}>
                <Text className={"h-[18px]"}>
                  {utilDate({ date: detail.createdAt, locale, isFull: true })}
                </Text>
                <span className={"mx-1.5 mb-1"}>.</span>
                <Text className={"mr-1.5 h-[18px]"}>{detail.total} lists</Text>
                {detail.isPrivate && <LockIcon className={"mt-0.5 h-3 w-3"} />}
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
          <Text
            className={
              "body2 min-h-[24px] break-all text-gray-600 md:min-h-[24px]"
            }
          >
            {detail.description}
          </Text>
        </Col>
        <Row
          className={
            "mt-[18px] items-center justify-between border-gray-200 py-0 md:mt-6 md:border-t md:py-3"
          }
        >
          <MobileBackButton className={"md:hidden"} />
          <Row className={"flex-1 justify-end gap-3 md:gap-5"}>
            <button className={"tooltip"}>
              <span className="tooltiptext tooltip-top body6 hidden md:block">
                Bookmark
              </span>
              <Bookmark className={"stroke-1 text-gray-500 hover:text-black"} />
            </button>
            <button className={"tooltip"}>
              <span className="tooltiptext tooltip-top body6 hidden md:block">
                More
              </span>
              <MoreHorizontal className={"text-gray-500 hover:text-black"} />
            </button>
          </Row>
        </Row>
      </Col>
    </header>
  );
}
