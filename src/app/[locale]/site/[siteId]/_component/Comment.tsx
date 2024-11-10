import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Row from "@/components/Layout/Row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

export function DesktopComment(props: { comments: any }) {
  const { comments } = props;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">댓글</h3>
        <select className="rounded-md border px-2 py-1 text-sm">
          <option>최신순</option>
          <option>추천순</option>
        </select>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full rounded-lg border p-2 text-sm"
          placeholder="이 사이트에 대한 의견을 공유해주세요..."
          rows={3}
        />
        <Button size="sm">작성</Button>
      </div>

      <Separator />

      <div className="space-y-6">
        {comments.map((comment: any) => (
          <div key={comment.id} className="space-y-2">
            <Row className="gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt={comment.author}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Row className="items-baseline justify-between">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </Row>
                <p className="mt-1 text-sm">{comment.content}</p>
                <Row className="mt-2 gap-3">
                  <Button variant="ghost" size="sm" className="h-6">
                    <ThumbsUp className="mr-1 h-3 w-3" />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6">
                    <ThumbsDown className="mr-1 h-3 w-3" />
                    <span className="text-xs">{comment.dislikes}</span>
                  </Button>
                </Row>
              </div>
            </Row>
            {comments.indexOf(comment) !== comments.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MobileComment(props: { comments: any }) {
  const { comments } = props;

  return (
    <div className="space-y-4">
      <Row className="items-center justify-between">
        <h3 className="text-lg font-semibold">댓글</h3>
        <select className="rounded-md border px-2 py-1 text-xs">
          <option>최신순</option>
          <option>추천순</option>
        </select>
      </Row>

      <div className="space-y-3">
        <textarea
          className="w-full rounded-lg border p-3 text-sm"
          placeholder="이 사이트에 대한 의견을 공유해주세요..."
          rows={2}
        />
        <Button size="sm" className="w-full">
          댓글 작성
        </Button>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <div className="space-y-4">
          {comments.map((comment: any) => (
            <div key={comment.id} className="space-y-3">
              <Row className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Row className="items-baseline justify-between">
                    <span className="text-xs font-medium">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </Row>
                  <p className="mt-1 text-sm text-gray-700">
                    {comment.content}
                  </p>
                  <Row className="mt-2 gap-2">
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ThumbsDown className="mr-1 h-3 w-3" />
                      <span className="text-xs">{comment.dislikes}</span>
                    </Button>
                  </Row>
                </div>
              </Row>
              {comments.indexOf(comment) !== comments.length - 1 && (
                <Separator />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
