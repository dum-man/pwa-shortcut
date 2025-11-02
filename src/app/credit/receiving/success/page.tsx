"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import EmailIcon from "@/assets/email-icon.svg";
import InstagramIcon from "@/assets/instagram-icon.svg";
import PhoneIcon from "@/assets/phone-icon.svg";
import TelegramIcon from "@/assets/telegram-icon.svg";
import { AppRoutes } from "@/config/routes";
import {
  BOT_LINK,
  CALL_CENTER_NUMBER,
  CALL_CENTER_NUMBER_2,
  INSTAGRAM_LINK,
  POST_ADDRESS,
} from "@/constants";
import { NextLink } from "@/ui";
import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: IProps) => {
  const t = useTranslations();

  useEffect(() => {
    sendYMEvent(YMEvent.LoanIssuedCard);
  }, []);

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Image
            className={styles["img"]}
            src="/images/success-icon.webp"
            width={80}
            height={83}
            quality={100}
            alt=""
          />
          <h2 className={styles["title"]}>{t("creditSuccess.title.1")}</h2>
          <div className={styles["info-wrapper"]}>
            <div className={styles["info-item"]}>
              <p>{formatSum(Number(searchParams["sum"]))}</p>
              <span>{t("creditSuccess.text.1")}</span>
            </div>
            <div className={styles["divider"]} />
            <div className={styles["info-item"]}>
              <p>
                {searchParams["days"]} {t("common.days")}
              </p>
              <span>{t("creditSuccess.text.2")}</span>
            </div>
          </div>
          <p className={styles["text"]}>{t("creditSuccess.text.3")}</p>

          <ul className={styles["social-list"]}>
            <li className={styles["social-item"]}>
              <a href={`tel:${CALL_CENTER_NUMBER}`}>
                <div className={styles["icon-wrapper"]}>
                  <PhoneIcon />
                </div>
                {CALL_CENTER_NUMBER}
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a href={`tel:${CALL_CENTER_NUMBER_2}`}>
                <div className={styles["icon-wrapper"]}>
                  <PhoneIcon />
                </div>
                {CALL_CENTER_NUMBER_2}
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a href={BOT_LINK} target="_blank">
                <div className={styles["icon-wrapper"]}>
                  <TelegramIcon />
                </div>
                Azpulmat_bot
              </a>
            </li>

            <li className={styles["social-item"]}>
              <a href={INSTAGRAM_LINK} target="_blank">
                <div className={styles["icon-wrapper"]}>
                  <InstagramIcon />
                </div>
                @azpulmat_promo.az
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a href={`mailto:${POST_ADDRESS}`}>
                <div className={styles["icon-wrapper"]}>
                  <EmailIcon />
                </div>
                {POST_ADDRESS}
              </a>
            </li>
          </ul>
        </div>
        <NextLink href={AppRoutes.User} size="md" variant="primary">
          {t("common.back")}
        </NextLink>
      </div>
    </section>
  );
};

export default Page;
