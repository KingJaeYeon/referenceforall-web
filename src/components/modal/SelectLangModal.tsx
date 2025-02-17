"use client";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import React from "react";
import Col from "@/components/Layout/Col";
import Row from "@/components/Layout/Row";
import { useLocale } from "use-intl";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getLanguageImg } from "@/util/image";
import Text from "@/components/Layout/Text";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useGlobalModalStore } from "@/store/globalModalStore";
import { buttonVariants } from "@/components/ui/button";
import { useTranslation } from "@/app/i18n/client";

export { SelectLangModalTrigger, SelectLangModal };

function SelectLangModalTrigger() {
  const { t, i18n } = useTranslation();
  const { setKey } = useGlobalModalStore();
  return (
    <Row
      onClick={() => setKey("selectLang")}
      className={buttonVariants({
        variant: "ghost",
        rounded: "full",
        className: "w-fit cursor-pointer items-center gap-2 px-3 py-2",
      })}
    >
      <Image src={getLanguageImg(i18n.language)} alt={i18n.language} width={20} height={20} />
      <Text className={"body4"}>{t(i18n.language)}</Text>
    </Row>
  );
}

function SelectLangModal() {
  const { t } = useTranslation();
  const { onClose } = useGlobalModalStore();
  const { replace } = useRouter();
  const pathname = usePathname();
  const onChangeLang = async (lang: string) => {
    const url = "/" + lang + pathname;
    replace(url);
    onClose();
  };

  return (
    <DialogContent className="md:max-w-[500px] md:px-16 md:py-10">
      <DialogHeader>
        <DialogTitle>{t("language")}</DialogTitle>
        <DialogDescription hidden>{t("language")}</DialogDescription>
      </DialogHeader>
      <DialogBody className={"scrollWidth3 flex flex-col gap-[25px] overflow-auto"}>
        <CurrencyCard onChangeLang={onChangeLang} />
      </DialogBody>
    </DialogContent>
  );
}

interface CurrencyCardProps {
  onChangeLang: (lang: string) => Promise<void>;
}

function CurrencyCard({ onChangeLang }: CurrencyCardProps) {
  const { t } = useTranslation();
  const dropDownList = [
    { symbol: "ko", name: t("ko") },
    { symbol: "en", name: t("en") },
    { symbol: "jp", name: t("jp") },
    { symbol: "cn", name: t("cn") },
  ];

  return (
    <Col className={"w-full max-w-full gap-[10px]"}>
      <Row className={"flex-wrap gap-[10px]"}>
        {dropDownList.map((item) => (
          <CurrencyItem key={item.symbol} item={item} onChangeLang={onChangeLang} />
        ))}
      </Row>
    </Col>
  );
}

interface CurrencyItemProps {
  item: any;
  onChangeLang: (lang: string) => Promise<void>;
}

function CurrencyItem({ item, onChangeLang }: CurrencyItemProps) {
  const locale = useLocale();

  return (
    <Label
      className={cn(
        "flex w-full max-w-full cursor-pointer items-center gap-[10px] rounded-[5px] bg-button-secondary-hover px-[10px] py-[8px]",
      )}
      onClick={() => onChangeLang(item.symbol)}
    >
      <Image src={getLanguageImg(item.symbol)} alt={item} width={26} height={26} />
      <Text className={"heading9 flex-1 text-foreground"}>{item.name}</Text>
      <Checkbox checked={locale === item.symbol} />
    </Label>
  );
}
