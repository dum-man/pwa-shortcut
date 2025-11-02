import { AxiosError } from "axios";

import { IUserState } from "@/types/user";
import { AppRoutes } from "@/config/routes";

export const isWebview = (userAgent: string) => {
  return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
};

export const createDigitsArray = (count: number) => Array(count).fill("");

export const setCookie = (name: string, value: string, maxAge?: number) => {
  // maxAge = minutes
  const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;

  const maxAgeInSeconds = maxAge ? maxAge * 60 : MONTH_IN_SECONDS;

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; max-age=${maxAgeInSeconds}; path=/`;
};

export const getCookie = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};

export const getErrorText = (error: AxiosError) => {
  const data = error.response?.data as any;

  if (typeof data === "string" && data.trim()) {
    return data;
  }

  if (error.response?.statusText) {
    return error.response?.statusText;
  }

  if (error.message) {
    return error.message;
  }

  return "Unknown error";
};

export async function convertDataUrlToFile(
  dataUrl: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}

export const getUserRoute = (userState: IUserState) => {
  const {
    hasDocumentFrontSide,
    hasDocumentBackSide,
    hasSelfie,
    needClientProfile,
    isVideoAttached,
    hasGuarantors,
  } = userState;
  if (!hasDocumentFrontSide) {
    return AppRoutes.RegistrationScanId;
  } else if (!hasDocumentBackSide) {
    return AppRoutes.RegistrationScanId;
  } else if (!hasSelfie) {
    return AppRoutes.UserSelfie;
  } else if (needClientProfile) {
    return AppRoutes.UserQuestionnaire;
  } else if (!isVideoAttached) {
    return AppRoutes.CreditReceivingVideoMessage;
  } else if (!hasGuarantors) {
    return AppRoutes.UserContacts;
  } else {
    return AppRoutes.CreditReceivingCalculator;
  }
};
