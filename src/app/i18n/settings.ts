export const fallbackLng = "en";
export const languages = [fallbackLng, "ko", "jp", "cn"];
export const cookieName = "i18next";
export const defaultNS = ''

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}