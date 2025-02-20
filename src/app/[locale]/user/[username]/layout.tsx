import { Col, ContentWrapper, PageWrapper, Row, Text } from "@/components/layout";
import React from "react";
import { EditSettingBtn } from "@/app/[locale]/user/[username]/_component/EditSettingBtn";
import ScrollTabs from "@/components/ScrollTabs";
import { fetchUser } from "@/service/user-service";
import { notFound } from "next/navigation";
import UserAvatar from "@/components/UserAvatar";
import { getJwtPayload } from "@/util/jwt-payload";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; username: string }>;
}) {
  const { username, locale } = await params;
  const decodeDisplayName = decodeURIComponent(username).slice(1);
  try {
    const result = await fetchUser({ displayName: decodeDisplayName }).then((r) => r.data);
    const user = result.data;
    const payload = await getJwtPayload();

    return (
      <PageWrapper>
        <ContentWrapper>
          <Row className={"w-full justify-center"}>
            <Col className={"w-full max-w-[700px] items-center"}>
              <Col className={"w-full items-center justify-between py-8 md:flex-row"}>
                <Col className={"items-center md:flex-row"}>
                  <UserAvatar className={"h-28 w-28"} alt={user.icon} src={user.icon} fbText={user.displayName} />
                  <Col className={"mb-10 mt-6 gap-2 md:mb-0 md:ml-8 md:mt-0"}>
                    <p className={"heading1 text-center font-semibold md:text-left"}>{user.displayName}</p>
                    <Row className={"gap-4"}>
                      <button className={"body5 text-gray-500"}>0 posts</button>
                      <button className={"body5 text-gray-500"}>0 bookmarks</button>
                      <button className={"body5 text-gray-500"}>0 comments</button>
                    </Row>
                    <Text className={"body5 text-gray-500"}># {user.username}</Text>
                  </Col>
                </Col>
                <EditSettingBtn isMine={payload?.id === user.id} />
              </Col>
              <ScrollTabs
                tabs={[
                  { label: "About", url: `/${locale}/@${user.displayName}` },
                  { label: "Library", url: `/${locale}/@${user.displayName}/list` },
                  { label: "Posts", url: `/${locale}/@${user.displayName}/posts` },
                  { label: "Comments", url: `/${locale}/@${user.displayName}/comments` },
                ]}
              />
              {children}
            </Col>
          </Row>
        </ContentWrapper>
      </PageWrapper>
    );
  } catch {
    notFound();
  }
}
