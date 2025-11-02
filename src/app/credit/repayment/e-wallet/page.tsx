import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <div>
          <h3 className={styles["title"]}>
            {t("repaymentMethods.subtitle.9")}
          </h3>
          <div
            className={styles["content"]}
            dangerouslySetInnerHTML={{
              __html: t.raw("repaymentMethodsPage.content.1"),
            }}
          />
        </div>
        <div className={styles["image-wrapper"]}>
          <Image
            src="/images/e-wallet-1.webp"
            width={305}
            height={283}
            quality={100}
            alt="e-wallet"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
