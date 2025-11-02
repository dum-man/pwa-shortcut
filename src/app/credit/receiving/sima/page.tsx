"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useMediaQuery } from "@/hooks";

import SimaDesktop from "./components/SimaDesktop/SimaDesktop";
import SimaMobile from "./components/SimaMobile/SimaMobile";
import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("sima");

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    sendYMEvent(YMEvent.SimaOpen);
  }, []);

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        {isMobile ? <SimaMobile /> : <SimaDesktop />}
      </div>
    </section>
  );
};

export default Page;
