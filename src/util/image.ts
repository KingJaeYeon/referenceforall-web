export function getLanguageImg(lang: string) {
  switch (lang) {
    case "ko":
      return "/images/KR.svg";
    case "en":
      return "/images/US.svg";
    case "jp":
      return "/images/JP.svg";
    case "cn":
      return "/images/CN.svg";
    default:
      return "";
  }
}
