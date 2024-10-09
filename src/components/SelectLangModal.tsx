"use client";

import React from "react";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import Text from "@/components/Layout/Text";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { useLocale } from "use-intl";
import { buttonVariants } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { getLanguageImg } from "@/util/image";

export default function SelectLangModal() {
  const t = useTranslations();
  const locale = useLocale();

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const onChangeLang = async (lang: string) => {
    window.location.href = `/${lang}`;
  };

  const openHandler = (open: boolean) => {
    if (open) setSearch("");
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={openHandler}>
      <DialogTrigger asChild>
        <Row
          className={buttonVariants({
            variant: "ghost",
            rounded: "full",
            className: "w-fit cursor-pointer items-center gap-2 px-3 py-2",
          })}
        >
          <Image
            src={getLanguageImg(locale)}
            alt={locale}
            width={20}
            height={20}
          />
          <Text className={"body4"}>{t(locale)}</Text>
        </Row>
      </DialogTrigger>
      <DialogContent className="flex h-full w-[100%] max-w-full flex-col gap-[20px] rounded-[0px] px-0 py-5 tb:h-auto tb:max-w-[425px] tb:rounded-[10px]">
        <DialogHeader className={"gap-[20px] px-5"}>
          <DialogTitle>{t("language")}</DialogTitle>
        </DialogHeader>
        <DialogBody
          className={"scrollWidth3 flex flex-col gap-[25px] overflow-auto px-5"}
        >
          <CurrencyCard onChangeCurrency={onChangeLang} search={search} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function CurrencyCard({
  search,
  onChangeCurrency,
}: {
  search: string;
  onChangeCurrency: any;
}) {
  const t = useTranslations();
  const dropDownList = [
    { symbol: "ko", name: t("ko") },
    { symbol: "en", name: t("en") },
    { symbol: "jp", name: t("jp") },
    { symbol: "cn", name: t("cn") },
  ];

  return (
    <Col className={"w-full max-w-full gap-[10px]"}>
      <Row className={"flex-wrap gap-[10px]"}>
        {dropDownList
          .filter((item) => item.name.toLowerCase().includes(search))
          .map((item) => {
            return (
              <CurrencyItem
                key={item.symbol}
                item={item}
                onChangeCurrency={onChangeCurrency}
              />
            );
          })}
      </Row>
    </Col>
  );
}

function CurrencyItem({
  item,
  onChangeCurrency,
}: {
  item: any;
  onChangeCurrency: any;
}) {
  const { theme } = useTheme();
  const locale = useLocale();

  return (
    <Label
      className={cn(
        "flex w-full max-w-full cursor-pointer items-center gap-[10px] rounded-[5px] px-[10px] py-[8px]",
        theme === "light"
          ? "hover:bg-popover-border bg-[#00000005]"
          : "bg-[#FFFFFF10] hover:bg-[#FFFFFF20]",
      )}
      onClick={() => onChangeCurrency(item.symbol)}
    >
      <Image
        src={getLanguageImg(item.symbol)}
        alt={item}
        width={26}
        height={26}
      />
      <Text className={"heading9 flex-1 text-foreground"}>{item.name}</Text>
      <Checkbox checked={locale === item.symbol} />
    </Label>
  );
}
