"use client";

import { useTranslations } from "next-intl";

import { Accordion } from "@/components";

import styles from "./styles.module.css";

const Faq = () => {
  const t = useTranslations("faq");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          <li>
            <Accordion summary={t("subtitle.1")}>
              <div
                className={styles["description"]}
                dangerouslySetInnerHTML={{ __html: t.raw("description.1") }}
              />
            </Accordion>
          </li>
          <li>
            <Accordion summary={t("subtitle.2")}>
              <div
                className={styles["description"]}
                dangerouslySetInnerHTML={{ __html: t.raw("description.2") }}
              />

              <div
                className={styles["description"]}
                dangerouslySetInnerHTML={{ __html: t.raw("description.3") }}
              />
            </Accordion>
          </li>
          <li>
            <Accordion summary={t("subtitle.3")}>
              <div className={styles["description"]}>{t("description.4")}</div>
            </Accordion>
          </li>
          <li>
            <Accordion summary={t("subtitle.4")}>
              <div
                className={styles["description"]}
                dangerouslySetInnerHTML={{ __html: t.raw("description.5") }}
              />
            </Accordion>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Faq;
