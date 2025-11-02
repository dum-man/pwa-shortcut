import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./styles.module.css";

const Advantages = () => {
  const t = useTranslations("advantages");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <Image
              src="/images/target-1.webp"
              alt="target"
              width={120}
              height={120}
              quality={100}
            />
            <h3 className={styles["sub-title"]}>{t("subTitle.1")}</h3>
            <p className={styles["sub-text"]}>{t("subText.1")}</p>
          </li>
          <li className={styles["list-item"]}>
            <Image
              src="/images/user-profile-1.webp"
              alt="user-profile"
              width={120}
              height={120}
              quality={100}
            />
            <h3 className={styles["sub-title"]}>{t("subTitle.2")}</h3>
            <p className={styles["sub-text"]}>{t("subText.2")}</p>
          </li>
          <li className={styles["list-item"]}>
            <Image
              src="/images/clock-1.webp"
              alt="clock"
              width={120}
              height={120}
              quality={100}
            />
            <h3 className={styles["sub-title"]}>{t("subTitle.3")}</h3>
            <p className={styles["sub-text"]}>{t("subText.3")}</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Advantages;
