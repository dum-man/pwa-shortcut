"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { sendYMEvent, YMEvent } from "@/analytics";

import styles from "./styles.module.css";
import { AppRoutes } from "@/config/routes";

const Page = () => {
  const t = useTranslations("receivingMethods");

  const router = useRouter();

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.1")}</h3>
            <div>
              <Image
                src="/images/credit-cards-1.webp"
                alt="credit card"
                width={72}
                height={72}
                quality={100}
              />
              <p>{t("text.1")}</p>
            </div>
            <button
              onClick={() => {
                sendYMEvent(YMEvent.LoanMethodCard);
                router.push(AppRoutes.CreditReceivingConfirm);
              }}
            >
              {t("action.1")}
            </button>
          </li>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.2")}</h3>
            <div>
              <Image
                src="/images/terminal-1.webp"
                alt="terminal"
                width={72}
                height={72}
                quality={100}
              />
              <p>{t("text.2")}</p>
            </div>
            <button
              disabled
              onClick={() => {
                sendYMEvent(YMEvent.LoanMethodTerminal);
                router.push(AppRoutes.CreditReceivingTerminal);
              }}
            >
              {t("action.1")}
            </button>
          </li>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.3")}</h3>
            <div>
              <Image
                src="/images/post-1.webp"
                alt="post"
                width={72}
                height={72}
                quality={100}
              />
              <p>{t("text.3")}</p>
            </div>
            <button
              disabled
              onClick={() => {
                sendYMEvent(YMEvent.LoanMethodAzermail);
                router.push(AppRoutes.CreditReceivingPost);
              }}
            >
              {t("action.1")}
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
