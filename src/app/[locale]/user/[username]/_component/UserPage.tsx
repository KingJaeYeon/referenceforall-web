"use client";
import useUserStore from "@/store/userStore";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';

export default function UserPage({ fetchUser }: { fetchUser: any }) {
  const { user } = useUserStore();
  return (
    <Col className={"items-center"}>
      <Col className={"w-full max-w-[700px] items-center justify-between py-8 md:flex-row"}>
        <Col className={"items-center md:flex-row"}>
          <Avatar className="h-28 w-28">
            <AvatarImage src={user.icon} alt={user.author} />
            <AvatarFallback>{user.displayName}</AvatarFallback>
          </Avatar>
          <Col className={"mb-10 mt-6 gap-2 md:mb-0 md:ml-8 md:mt-0"}>
            <p className={"heading1 text-center font-semibold md:text-left"}>{user.displayName}</p>
            <Row className={"gap-4"}>
              <button className={"body5 text-gray-500"}>0 posts</button>
              <button className={"body5 text-gray-500"}>0 bookmarks</button>
              <button className={"body5 text-gray-500"}>0 comments</button>
            </Row>
            <p className={"body5 text-gray-500"}>출석체크 0</p>
          </Col>
        </Col>
        {fetchUser.id === user.id && (
          <Row>
            <Button className={"p-5 font-medium"} font={"heading4"}>
              Edit Profile
            </Button>
          </Row>
        )}
      </Col>
      <Col>
        <p>ABOUT</p>
        <Textarea readOnly value={user.aboutMe??'아아아앙'}/>
      </Col>
    </Col>
  );
}
