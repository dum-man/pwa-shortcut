"use client";

import { useTranslations } from "next-intl";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2
          className={styles["title"]}
          dangerouslySetInnerHTML={{ __html: t.raw("registration.title.1") }}
        />
        <div className={styles["divider"]} />
        <p className={styles["text"]}>{t("registration.text.1")}</p>
        <ul className={styles["list"]}>
          <li>{t("registration.list.1.1")}</li>
          <li>{t("registration.list.1.2")}</li>
          <li>{t("registration.list.1.3")}</li>
        </ul>
      </div>
      <NextLink
        href={AppRoutes.RegistrationPreRegister}
        size="md"
        variant="primary"
        onClick={() => sendYMEvent(YMEvent.MainContinue)}
      >
        {t("common.next")}
      </NextLink>
    </>
  );
};

export default Page;
