import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import useUrlParams from "@/hook/useUrlParams";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Col from "@/components/Layout/Col";
import Text from "@/components/Layout/Text";
import TagSelector from "@/components/TagSelector";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export function AddTopicPopup({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const { updateUrlParams } = useUrlParams();
  const t = useTranslations();
  const [searchMode, setSearchMode] = useState<string>("and");
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const openHandler = (open: boolean) => {
    if (open) {
      setTags(searchParams.get("tags")?.split(",") || []);
      setSearchMode(searchParams.get("searchMode") || "and");
    }
    setOpen(open);
  };

  const submitHandler = () => {
    updateUrlParams({
      searchMode: tags.length > 0 ? searchMode.toLowerCase() : "",
      tags: tags.join(","),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={openHandler}>
      <DialogTrigger asChild className={"w-[80px]"}>
        {children}
      </DialogTrigger>
      <DialogContent className="tb:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title_addTopic")}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <Col className={"gap-3"}>
            <Col className={"gap-2"}>
              <Text className={"body5"}>
                {t("desc_addSubject", { count: 4 })}
              </Text>
              <TagSelector tags={tags} setTags={setTags} />
            </Col>
            <div className="flex items-center justify-between">
              <Label htmlFor="search-mode" className="text-right">
                {t("searchMode")}: {searchMode.toUpperCase()}
              </Label>
              <Switch
                id="search-mode"
                checked={searchMode === "or"}
                onCheckedChange={(checked) =>
                  setSearchMode(checked ? "or" : "and")
                }
                custonLable={{ on: "OR", off: "AND" }}
              />
            </div>
          </Col>
        </DialogDescription>
        <DialogFooter>
          <Button type="submit" onClick={submitHandler} className={"px-[18px]"}>
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
