"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useMediaQuery } from "@/hooks";
import { Locale } from "@/i18n/config";

import { images, links } from "../data";
import styles from "./styles.module.css";

import "swiper/css";
import "swiper/css/effect-fade";

const LeadSwiper = () => {
  const locale = useLocale() as Locale;

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const device = isMobile ? "mobile" : "desktop";

  return (
    <Swiper
      effect="fade"
      spaceBetween={30}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, EffectFade]}
      className={styles["swiper"]}
    >
      {([1, 2, 3, 4] as const).map((item) => (
        <SwiperSlide key={item}>
          <Image
            className={styles["image"]}
            src={images[device][locale][item]}
            quality={100}
            priority
            alt=""
            onClick={() => router.push(links[item])}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LeadSwiper;
