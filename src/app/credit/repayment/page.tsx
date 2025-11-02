import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { AppRoutes } from "@/config/routes";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("repaymentMethods");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.8")}</h3>
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
            <Link href={AppRoutes.CreditRepaymentCreditCard}>
              {t("action.2")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.5")}</h3>
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
            <Link href={AppRoutes.CreditRepaymentTerminal}>
              {t("action.3")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.9")}</h3>
            <div>
              <Image
                src="/images/e-wallet-1.webp"
                alt="e-wallet"
                width={70}
                height={65}
                quality={100}
              />
              <p>{t("text.3")}</p>
            </div>
            <Link href={AppRoutes.CreditRepaymentEWallet}>{t("action.3")}</Link>
          </li>
          <li className={styles["list-item"]}>
            <h3>{t("subtitle.7")}</h3>
            <div>
              <Image
                src="/images/post-1.webp"
                alt="post"
                width={72}
                height={72}
                quality={100}
              />
              <p>{t("text.4")}</p>
            </div>
            <Link href={AppRoutes.CreditRepaymentPost}>{t("action.3")}</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
