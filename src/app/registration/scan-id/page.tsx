"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("scanInstructions.title.1")}</h2>
        <ul>
          <li className={styles["list-item"]}>
            <div className={styles["icon-wrapper"]}>
              <Image
                src="/images/id-icon-1.webp"
                width={55}
                height={32}
                quality={100}
                alt="id"
              />
            </div>
            <p>{t("scanInstructions.subTitle.1")}</p>
          </li>
          <li className={styles["list-item"]}>
            <div className={styles["icon-wrapper"]}>
              <Image
                src="/images/scan-id-icon-1.webp"
                width={56}
                height={50}
                quality={100}
                alt="scan-id"
              />
            </div>
            <div>
              <p>{t("scanInstructions.subTitle.2")}</p>
              <ul className={styles["inner-list"]}>
                <li>{t("scanInstructions.list.1.1")}</li>
                <li>{t("scanInstructions.list.1.2")}</li>
                <li>{t("scanInstructions.list.1.3")}</li>
              </ul>
            </div>
          </li>
        </ul>
        <p className={styles["text"]}>{t("scanInstructions.text.1")}</p>
      </div>
      <NextLink
        href={AppRoutes.RegistrationScanIdDocType}
        size="md"
        onClick={() => sendYMEvent(YMEvent.MainScan1)}
      >
        {t("common.scan")}
      </NextLink>
    </div>
  );
};

export default Page;
