import { setCookie } from ".";

export const promotionCookieInit = () => {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(document.location.search);

    const source = searchParams.get("utm_source");
    const clickId = searchParams.get("aff_sub");
    const webId = searchParams.get("utm_campaign");

    if (source) {
      setCookie("source", source);
    }

    if (clickId) {
      setCookie("clickId", clickId);
    }

    if (webId) {
      setCookie("webId", webId);
    }
  }
};
