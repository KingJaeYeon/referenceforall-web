"use client";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { utilDate } from "@/lib/dateFormat";
import {
  Bookmark,
  Calendar,
  MessageCircle,
  MoreHorizontal,
  Star,
} from "lucide-react";
import { useLocale } from "use-intl";
import { IconDropDownDown } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";

export function MainCard(props: {
  site: any;
  isFirst: boolean;
  isLast: boolean;
  hasMore: boolean;
  readonly?: boolean;
}) {
  const locale = useLocale();
  const { site, isFirst, isLast, hasMore, readonly = true } = props;
  const t = useTranslations();

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [memo, setMemo] = useState("");

  const onChangeMemo = (value: any) => {
    if (textarea.current) {
      textarea.current.style.height = "auto"; //height 초기화
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
    setMemo(value);
  };

  return (
    <article className={cn("relative w-full", isFirst ? "" : "mt-[32px]")}>
      <Row className={"flex flex-wrap"}>
        {!readonly && (
          <Row className={"mb-6 w-full items-center gap-[6px]"}>
            <Textarea
              ref={textarea}
              value={!!memo ? memo : site?.memo}
              rows={1}
              variant={"blockquote"}
              placeholder={"Use this memo"}
              onChange={(e) => onChangeMemo(e.target.value)}
              className={"h-[37px] min-h-0 w-full resize-none md:min-h-0"}
            />
            <Col
              className={
                "w-[20%] items-end gap-4 md:flex-row-reverse md:justify-start"
              }
            >
              <button
                className={"body6 text-description hover:text-foreground"}
              >
                Done
              </button>
              <button className={"body6 text-destructive"}>Cancel</button>
            </Col>
          </Row>
        )}
        <Link href={`/site/${site.id}`} className={"w-full"}>
          <Row className={"w-full"}>
            <Col className={"w-full"}>
              <h2
                className={
                  "heading1 ellipsisLine2 max-h-[90px] font-semibold md:text-[28px]"
                }
              >
                {site.name}
              </h2>

              <Row className={"pt-[8px]"}>
                <h3
                  className={
                    "body4 md:body3 ellipsisLine2 min-h-[24px] text-gray-500 md:min-h-[40px]"
                  }
                >
                  {site.description}
                </h3>
              </Row>
              <Row
                className={
                  "mt-[10px] hidden h-[48px] max-w-[512px] items-center justify-between md:flex"
                }
              >
                <Row className={"gap-[16px] text-gray-500"}>
                  <Row className={"h-fit items-center"}>
                    <Calendar className="mr-1 h-4 w-4" />
                    <Text className={"body6"}>{site.lastUpdate}</Text>
                  </Row>
                  <Row className={"h-fit items-center gap-[4px]"}>
                    <MessageCircle className={"h-[16px] w-[16px]"} />
                    <Text className={"body6"}>{site.comments}</Text>
                  </Row>
                  <Row className={"h-fit items-center"}>
                    <Bookmark className={"mr-1 h-[16px] w-[16px]"} />
                    <Text className={"body6"}>{site.watchList}</Text>
                  </Row>
                </Row>
                <Row className={"h-fit items-center gap-[12px]"}>
                  <Bookmark className={"h-[24px] w-[24px] text-gray-500"} />
                  <MoreHorizontal
                    className={"h-[24px] w-[24px] text-gray-500"}
                  />
                </Row>
              </Row>
            </Col>
            {!!site.imageUrl && (
              <div className={"ml-[24px] mt-3 md:ml-[56px]"}>
                <div className={"hidden md:block"}>
                  <img
                    alt={site.name}
                    className={"overflow-clip rounded-[2px] align-middle"}
                    src={site.imageUrl}
                    width={160}
                    loading={"lazy"}
                    height={107}
                    style={{
                      aspectRatio: "auto 160 / 107",
                      overflowClipMargin: "content-box",
                    }}
                  />
                </div>
                <div className={"mt-2 block md:hidden"}>
                  <img
                    alt={site.name}
                    className={"overflow-clip rounded-[2px] align-middle"}
                    src={site.imageUrl}
                    width={90}
                    loading={"lazy"}
                    height={53}
                    style={{
                      aspectRatio: "auto 80 / 53",
                      overflowClipMargin: "content-box",
                    }}
                  />
                </div>
              </div>
            )}
          </Row>

          <Row
            className={
              "flex min-h-[48px] w-full items-center justify-between text-gray-500 md:mt-[12px] md:hidden"
            }
          >
            <Row className={"gap-[16px]"}>
              <Row className={"h-fit"}>
                <Text className={"body6"}>
                  {utilDate({ date: site.lastUpdate, locale })}
                </Text>
              </Row>
              <Row className={"h-fit items-center gap-[4px]"}>
                <MessageCircle className={"h-[16px] w-[16px]"} />
                <Text className={"body6"}>{site.comments}</Text>
              </Row>
              <Row className={"h-fit items-center gap-[4px]"}>
                <Bookmark className={"mr-1 h-[16px] w-[16px]"} />
                <Text className={"body6"}>{site.watchList}</Text>
              </Row>
            </Row>
            <Row className={"h-fit items-center gap-[12px]"}>
              <Bookmark className={"h-[24px] w-[24px] text-gray-500"} />
              <MoreHorizontal className={"h-[24px] w-[24px] text-gray-500"} />
            </Row>
          </Row>
        </Link>
        {!isLast && (
          <Row className={"mt-[20px] w-full border-b border-gray-300"} />
        )}
      </Row>

      {hasMore && (
        <Row
          className={
            "show-more-x absolute bottom-0 h-[calc(100%+30px)] max-h-[250px] w-full items-end justify-center gap-[4px] pb-[24px]"
          }
        >
          <Text className={"body3 flex h-fit cursor-pointer items-center"}>
            {t("show_more")}
          </Text>
          <IconDropDownDown
            className={"relative h-[18px] w-[18px] cursor-pointer"}
          />
        </Row>
      )}
    </article>
  );
}
