"use client";

import React from "react";
import Col from "@/components/Layout/Col";
// import { useTranslation } from "react-i18next";
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

export default function SelectLangModal({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  // const { t, i18n } = useTranslation();
  const { t, i18n } = {
    t: (key: string) => key,
    i18n: {
      language: "ko",
      changeLanguage: (str: string) => (i18n.language = str),
    },
  };

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  async function onChangeLang(lang: string) {
    localStorage.setItem("lang", lang);
    await i18n.changeLanguage(lang);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(boolean) => {
        if (boolean) {
          setSearch("");
        }
        setOpen(boolean);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-full w-[100%] max-w-full flex-col gap-[20px] rounded-[0px] px-0 py-5 tb:h-auto tb:max-w-[425px] tb:rounded-[10px]">
        <DialogHeader className={"gap-[20px] px-5"}>
          <DialogTitle>언어 선택</DialogTitle>
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
  const { t, i18n } = {
    t: (key: string) => key,
    i18n: {
      language: "ko",
      changeLanguage: (str: string) => (i18n.language = str),
    },
  };
  const dropDownList = [
    { symbol: "ko", name: t("ko") },
    { symbol: "en", name: t("en") },
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
  const { i18n } = {
    t: (key: string) => key,
    i18n: {
      language: "ko",
      changeLanguage: (str: string) => (i18n.language = str),
    },
  };

  function getImage(lang: string) {
    if (lang === "ko") return "/images/KR.svg";
    if (lang === "en") return "/images/US.svg";
    return "KR";
  }

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
      <Image src={getImage(item.symbol)} alt={item} width={26} height={26} />
      <Text className={"heading9 flex-1 text-foreground"}>{item.name}</Text>
      <Checkbox checked={i18n?.language === item.symbol} />
    </Label>
  );
}
