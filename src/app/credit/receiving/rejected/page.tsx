"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  useEffect(() => {
    sendYMEvent(YMEvent.LoanReject);
  }, []);

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Image
            src="/images/reject-icon.webp"
            width={112}
            height={112}
            quality={100}
            alt="reject"
          />
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw("creditReceivingRejected.text.1"),
            }}
          />
        </div>
        <NextLink href={AppRoutes.User} size="md" variant="primary">
          {t("common.back")}
        </NextLink>
      </div>
    </section>
  );
};

export default Page;
