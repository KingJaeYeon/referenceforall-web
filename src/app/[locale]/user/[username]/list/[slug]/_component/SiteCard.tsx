"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  MessageSquare,
  Eye,
  Calendar,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { IconDropDownDown } from "@/assets/svg";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AdditionalUrl {
  url: string;
  memo: string;
}

interface UserBookmark {
  isBookmarked: boolean;
  memo: string;
  additionalUrls: AdditionalUrl[];
}

export function ParentComponent() {
  const [userBookmarks, setUserBookmarks] = useState<
    Record<string, UserBookmark>
  >({});

  const handleBookmarkUpdate = (siteId: string, bookmark: UserBookmark) => {
    setUserBookmarks((prev) => ({
      ...prev,
      [siteId]: bookmark,
    }));
    // 여기에서 서버로 업데이트된 북마크 정보를 전송할 수 있습니다.
  };

  const siteData = {
    id: "1",
    name: "Example Site",
    description: "This is an example site description.",
    imageUrl: "/example-site-image.jpg",
    url: "https://example.com",
    lastUpdate: "2023-06-01",
    comments: 10,
    visitors: 1000,
    watchList: 50,
  };

  return (
    <SiteCard
      site={siteData}
      isFirst={true}
      isLast={false}
      hasMore={true}
      userBookmark={
        userBookmarks[siteData.id] || {
          isBookmarked: false,
          memo: "",
          additionalUrls: [],
        }
      }
      onBookmarkUpdate={handleBookmarkUpdate}
    />
  );
}

export function SiteCard(props: {
  site: any;
  isFirst: boolean;
  isLast: boolean;
  hasMore: boolean;
  userBookmark: UserBookmark;
  onBookmarkUpdate: (siteId: string, bookmark: UserBookmark) => void;
}) {
  const { site, isFirst, isLast, hasMore, userBookmark, onBookmarkUpdate } =
    props;
  const [localBookmark, setLocalBookmark] =
    useState<UserBookmark>(userBookmark);
  const [newUrl, setNewUrl] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const t = useTranslations();

  const handleBookmarkToggle = () => {
    const updatedBookmark = {
      ...localBookmark,
      isBookmarked: !localBookmark.isBookmarked,
    };
    setLocalBookmark(updatedBookmark);
    onBookmarkUpdate(site.id, updatedBookmark);
  };

  const handleMemoChange = (newMemo: string) => {
    const updatedBookmark = { ...localBookmark, memo: newMemo.slice(0, 100) };
    setLocalBookmark(updatedBookmark);
    onBookmarkUpdate(site.id, updatedBookmark);
  };

  const handleAddUrl = () => {
    if (newUrl) {
      const updatedUrls = [
        ...localBookmark.additionalUrls,
        { url: newUrl, memo: "" },
      ];
      const updatedBookmark = { ...localBookmark, additionalUrls: updatedUrls };
      setLocalBookmark(updatedBookmark);
      setNewUrl("");
      onBookmarkUpdate(site.id, updatedBookmark);
    }
  };

  const handleRemoveUrl = (index: number) => {
    const updatedUrls = localBookmark.additionalUrls.filter(
      (_, i) => i !== index,
    );
    const updatedBookmark = { ...localBookmark, additionalUrls: updatedUrls };
    setLocalBookmark(updatedBookmark);
    onBookmarkUpdate(site.id, updatedBookmark);
  };

  const handleUrlMemoChange = (index: number, newMemo: string) => {
    const updatedUrls = localBookmark.additionalUrls.map((url, i) =>
      i === index ? { ...url, memo: newMemo.slice(0, 100) } : url,
    );
    const updatedBookmark = { ...localBookmark, additionalUrls: updatedUrls };
    setLocalBookmark(updatedBookmark);
    onBookmarkUpdate(site.id, updatedBookmark);
  };

  return (
    <Card className={cn("w-full max-w-2xl", isFirst ? "" : "mt-[32px]")}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={site.imageUrl} alt={site.name} />
          <AvatarFallback>{site.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-2xl">{site.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{site.description}</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                {"preview"}
              </Button>
            </DialogTrigger>
            <DialogContent className="h-[80vh] w-full max-w-4xl">
              <DialogHeader>
                <DialogTitle>{site.name}</DialogTitle>
                <DialogDescription>{site.url}</DialogDescription>
              </DialogHeader>
              <iframe
                src={site.url}
                className="h-full w-full border-0"
                title={`Preview of ${site.name}`}
              />
            </DialogContent>
          </Dialog>
          <Button
            variant={localBookmark.isBookmarked ? "secondary" : "outline"}
            onClick={handleBookmarkToggle}
          >
            <Bookmark
              className={cn(
                "h-4 w-4",
                localBookmark.isBookmarked ? "fill-current" : "",
              )}
            />
            <span className="sr-only">
              {localBookmark.isBookmarked ? "remove_bookmark" : "add_bookmark"}
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {format(new Date(site.lastUpdate), "MMM d, yyyy")}
          </span>
          <span className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" />
            {site.comments}
          </span>
          <span className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {site.visitors}
          </span>
          <Badge variant="secondary" className="flex items-center">
            <Bookmark className="mr-1 h-4 w-4" />
            {site.watchList}
          </Badge>
        </div>
        {localBookmark.isBookmarked && (
          <>
            <div className="space-y-2">
              <Input
                value={localBookmark.memo}
                onChange={(e) => handleMemoChange(e.target.value)}
                placeholder={"enter_memo"}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                {"characters_remaining"}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={"enter_additional_url"}
                  className="flex-1"
                />
                <Button onClick={handleAddUrl}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {localBookmark.additionalUrls.map((urlItem, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input value={urlItem.url} readOnly className="flex-1" />
                  <Input
                    value={urlItem.memo}
                    onChange={(e) => handleUrlMemoChange(index, e.target.value)}
                    placeholder={"enter_url_memo"}
                    maxLength={100}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveUrl(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <a href={`/site/${site.id}`}>{"view_details"}</a>
        </Button>
        {!isLast && <div className="w-full border-b border-gray-300" />}
        {hasMore && (
          <div className="flex cursor-pointer items-center gap-1">
            <span className="text-sm">{"show_more"}</span>
            <IconDropDownDown className="h-4 w-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
