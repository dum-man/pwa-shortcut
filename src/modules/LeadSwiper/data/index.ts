import { StaticImageData } from "next/image";

import bannerDesktopAz1 from "@/assets/banners/desktop-az-1.webp";
import bannerDesktopAz2 from "@/assets/banners/desktop-az-2.webp";
import bannerDesktopAz3 from "@/assets/banners/desktop-az-3.webp";
import bannerDesktopAz4 from "@/assets/banners/desktop-az-4.webp";
import bannerDesktopRu1 from "@/assets/banners/desktop-ru-1.webp";
import bannerDesktopRu2 from "@/assets/banners/desktop-ru-2.webp";
import bannerDesktopRu3 from "@/assets/banners/desktop-ru-3.webp";
import bannerDesktopRu4 from "@/assets/banners/desktop-ru-4.webp";
import bannerMobileAz1 from "@/assets/banners/mobile-az-1.webp";
import bannerMobileAz2 from "@/assets/banners/mobile-az-2.webp";
import bannerMobileAz3 from "@/assets/banners/mobile-az-3.webp";
import bannerMobileAz4 from "@/assets/banners/mobile-az-4.webp";
import bannerMobileRu1 from "@/assets/banners/mobile-ru-1.webp";
import bannerMobileRu2 from "@/assets/banners/mobile-ru-2.webp";
import bannerMobileRu3 from "@/assets/banners/mobile-ru-3.webp";
import bannerMobileRu4 from "@/assets/banners/mobile-ru-4.webp";
import { INSTAGRAM_LINK } from "@/constants";
import { Locale } from "@/i18n/config";

export const images: Record<
  "mobile" | "desktop",
  Record<Locale, Record<1 | 2 | 3 | 4, StaticImageData>>
> = {
  mobile: {
    ru: {
      1: bannerMobileRu1,
      2: bannerMobileRu2,
      3: bannerMobileRu3,
      4: bannerMobileRu4,
    },
    az: {
      1: bannerMobileAz1,
      2: bannerMobileAz2,
      3: bannerMobileAz3,
      4: bannerMobileAz4,
    },
  },

  desktop: {
    ru: {
      1: bannerDesktopRu1,
      2: bannerDesktopRu2,
      3: bannerDesktopRu3,
      4: bannerDesktopRu4,
    },
    az: {
      1: bannerDesktopAz1,
      2: bannerDesktopAz2,
      3: bannerDesktopAz3,
      4: bannerDesktopAz4,
    },
  },
};

export const links: Record<1 | 2 | 3 | 4, string> = {
  1: INSTAGRAM_LINK,
  2: "https://sitemain.onelink.me/i4CN/szdfi1rz",
  3: "https://sitemain.onelink.me/i4CN/w2mbtk3q",
  4: "https://sitemain.onelink.me/i4CN/t4j1czhp",
};
