import { enUS, ja, ko, zhCN } from "date-fns/locale";
import { format } from "date-fns";

export const utilDate = (data: {
  date: any;
  locale: string;
  isFull?: boolean;
}) => {
  const { date, locale: _locale, isFull } = data;
  const currentYear = new Date().getFullYear();
  let [locale, dateFormat] = [ko, "MMM dd"];

  if (_locale === "en") locale = enUS;
  if (_locale === "jp") locale = ja;
  if (_locale === "cn") locale = zhCN;

  if (new Date(date).getFullYear() !== currentYear || isFull) {
    dateFormat = "MMM dd, yyyy";
  }

  return format(new Date(date), dateFormat, { locale });
};
