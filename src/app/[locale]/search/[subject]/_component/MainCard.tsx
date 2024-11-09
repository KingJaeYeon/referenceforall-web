"use client";
import Row from "@/components/Layout/Row";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import { utilDate } from "@/lib/dateFormat";
import { Bookmark, Eye, MessageCircle } from "lucide-react";
import React from "react";
import { useLocale } from "use-intl";
import { IconDropDownDown } from "@/assets/svg";
import { cn } from "@/lib/utils";

export function SiteCard(props: {
  site: any;
  isFirst: boolean;
  isLast: boolean;
  hasMore: boolean;
}) {
  const locale = useLocale();
  const { site, isFirst, isLast, hasMore } = props;
  return (
    <article className={cn("relative", isFirst ? "" : "mt-[32px]")}>
      <Row className={"flex flex-wrap"}>
        <Row className={"w-full"}>
          <Col className={"w-full"}>
            <h2 className={"heading2 tb:heading1 ellipsisLine2 max-h-[90px]"}>
              {site.name}
            </h2>

            <Row className={"pt-[8px]"}>
              <h3
                className={
                  "body4 tb:body3 ellipsisLine2 max-h-[40px] text-gray-500"
                }
              >
                {site.description}
              </h3>
            </Row>
            <Row
              className={
                "mt-[10px] hidden h-[48px] max-w-[512px] items-center justify-between tb:flex"
              }
            >
              <Row className={"gap-[16px] text-gray-500"}>
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
                  <Eye className={"h-[16px] w-[16px]"} />
                  <Text className={"body6"}>{site.visitors}</Text>
                </Row>
              </Row>
              <Row className={"h-fit items-center gap-[4px]"}>
                <Bookmark className={"h-[24px] w-[24px] text-gray-500"} />
                <Text className={"body6"}>{site.watchList}</Text>
              </Row>
            </Row>
          </Col>
          {!!site.imageUrl && (
            <div className={"ml-[24px] tb:ml-[56px]"}>
              <div className={"hidden tb:block"}>
                <img
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
              <div className={"block tb:hidden"}>
                <img
                  className={"overflow-clip rounded-[2px] align-middle"}
                  src={site.imageUrl}
                  width={80}
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
            "mt-[12px] flex h-[48px] w-full items-center justify-between text-gray-500 tb:hidden"
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
              <Eye className={"h-[16px] w-[16px]"} />
              <Text className={"body6"}>{site.visitors}</Text>
            </Row>
          </Row>
          <Row className={"h-fit items-center gap-[4px]"}>
            <Bookmark className={"h-[24px] w-[24px]"} />
            <Text className={"body6"}>{site.watchList}</Text>
          </Row>
        </Row>
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
            Show more
          </Text>
          <IconDropDownDown
            className={"relative h-[18px] w-[18px] cursor-pointer"}
          />
        </Row>
      )}
    </article>
  );
}
