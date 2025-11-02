"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { AppRoutes } from "@/config/routes";
import { CALL_CENTER_NUMBER, CALL_CENTER_NUMBER_2 } from "@/constants";
import { isWebview } from "@/utils";

import NavLinks from "../NavLinks/NavLinks";
import SocialLinks from "../SocialLinks/SocialLinks";
import styles from "./styles.module.css";

const Footer = () => {
  const t = useTranslations("footer");

  if (isWebview(window.navigator.userAgent)) {
    return null;
  }

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-wrapper"]}>
        <Link href={AppRoutes.Main} className={styles["logo-link"]}>
          <Image
            src="/images/logo-1.webp"
            width={141}
            height={25}
            quality={100}
            alt="Logo"
          />
        </Link>
        <div className={styles["wrapper"]}>
          <NavLinks />
          <div className={styles["call-center"]}>
            <h3>{t("subtitle.1")}</h3>
            <a href={`tel:${CALL_CENTER_NUMBER}`}>{CALL_CENTER_NUMBER}</a>
            <br />
            <a href={`tel:${CALL_CENTER_NUMBER_2}`}>{CALL_CENTER_NUMBER_2}</a>
          </div>
          <SocialLinks />
        </div>
        <p className={styles["footer-text"]}>{t("text.1")}</p>
        <br />
        <p className={styles["footer-text"]}>{t("text.2")}</p>
      </div>
    </footer>
  );
};

export default Footer;
