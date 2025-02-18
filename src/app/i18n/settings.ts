export const fallbackLng = "en";
export const languages = ["en", "ko", "jp", "cn"];
export const cookieName = "i18next";
export const defaultNS = "";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
