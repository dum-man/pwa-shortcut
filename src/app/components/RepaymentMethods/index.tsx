"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useMediaQuery, useStep } from "@/hooks";

import styles from "./styles.module.css";

const RepaymentMethods = () => {
  const t = useTranslations("repaymentMethods");

  const isMobile = useMediaQuery("(max-width: 768px)");

  const [activeTab, { setStep: setActiveTab }] = useStep(3);

  return (
    <section id="how-to-repay" className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        {activeTab === 1 && (
          <div className={styles["tab-content"]}>
            <Image
              src="/images/credit-cards-1.webp"
              alt="credit cards"
              width={341}
              height={339}
              quality={100}
            />
            <div>
              <h3>{t("content.1.title.1")}</h3>
              <ul>
                <li>
                  <h4>{t("content.1.subtitle.1")}</h4>
                  <p>{t("content.1.text.1")}</p>
                  <p>{t("content.1.text.2")}</p>
                </li>
                <li>
                  <h4>{t("content.1.subtitle.2")}</h4>
                  <p>{t("content.1.text.3")}</p>
                  <p>{t("content.1.text.4")}</p>
                </li>
                <li>
                  <h4>
                    {t.rich("content.1.subtitle.3", {
                      appLink: (text) =>
                        isMobile ? (
                          <a href="https://onelink.to/uq7ccc/">{text}</a>
                        ) : (
                          text
                        ),
                      siteLink: (text) => (
                        <a href="https://million.az/services/">{text}</a>
                      ),
                    })}
                  </h4>
                  <p>{t("content.1.text.5")}</p>
                  <p>{t("content.1.text.6")}</p>
                </li>
                <li>
                  <h4>
                    {t.rich("content.1.subtitle.4", {
                      appLink: (text) =>
                        isMobile ? (
                          <a href="https://onelink.to/6v955g/">{text}</a>
                        ) : (
                          text
                        ),
                    })}
                  </h4>
                  <p>{t("content.1.text.7")}</p>
                  <p>{t("content.1.text.8")}</p>
                </li>
                <li>
                  <h4>
                    {t.rich("content.1.subtitle.5", {
                      appLink: (text) =>
                        isMobile ? (
                          <a href="https://onelink.to/stuvkb/">{text}</a>
                        ) : (
                          text
                        ),
                    })}
                  </h4>
                  <p>{t("content.1.text.9")}</p>
                  <p>{t("content.1.text.10")}</p>
                </li>
                <li>
                  <h4>
                    {t.rich("content.1.subtitle.6", {
                      appLink: (text) =>
                        isMobile ? (
                          <a href="https://onelink.to/x99fp7/">{text}</a>
                        ) : (
                          text
                        ),
                    })}
                  </h4>
                  <p>{t("content.1.text.11")}</p>
                  <p>{t("content.1.text.12")}</p>
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className={styles["tab-content"]}>
            <Image
              src="/images/terminal-2.webp"
              alt="terminal"
              width={316}
              height={316}
              quality={100}
            />
            <div dangerouslySetInnerHTML={{ __html: t.raw("content.2") }} />
          </div>
        )}
        {activeTab === 3 && (
          <div className={styles["tab-content"]}>
            <Image
              src="/images/post-1.webp"
              alt="post"
              width={322}
              height={308}
              quality={100}
            />
            <div dangerouslySetInnerHTML={{ __html: t.raw("content.3") }} />
          </div>
        )}
        <div className={styles["tabs"]}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <button
              key={idx}
              className={classNames(styles["tab"], {
                [styles["active-tab"]]: activeTab === idx + 1,
              })}
              onClick={() => setActiveTab(idx + 1)}
            >
              <span>{idx + 1}</span>
              <p>{t(`subtitle.${idx + 1}`)}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RepaymentMethods;
