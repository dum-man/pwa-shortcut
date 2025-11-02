import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./styles.module.css";

const HowToGet = () => {
  const t = useTranslations("howToGet");

  return (
    <section id="how-to-get" className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <p className={styles["text"]}>{t("text.1")}</p>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <div>
              <h3 className={styles["sub-title"]}>{t("subTitle.1")}</h3>
              <p className={styles["sub-text"]}>{t("subText.1")}</p>
              <div className={styles["sub-description-wrapper"]}>
                <span>01</span>
                <p className={styles["sub-description"]}>
                  {t("subDescription.1")}
                </p>
              </div>
            </div>
            <div className={styles["image-wrapper"]}>
              <Image
                src="/images/laptop-1.webp"
                alt="laptop"
                width={150}
                height={150}
                quality={100}
              />
            </div>
          </li>
          <li className={styles["list-item"]}>
            <div>
              <h3 className={styles["sub-title"]}>{t("subTitle.2")}</h3>
              <p className={styles["sub-text"]}>{t("subText.2")}</p>
              <div className={styles["sub-description-wrapper"]}>
                <span>02</span>
                <p className={styles["sub-description"]}>
                  {t("subDescription.2")}
                </p>
              </div>
            </div>
            <div className={styles["image-wrapper"]}>
              <Image
                src="/images/user-profile-2.webp"
                width={150}
                height={150}
                alt="user-profile"
                quality={100}
              />
            </div>
          </li>
          <li className={styles["list-item"]}>
            <div>
              <h3 className={styles["sub-title"]}>{t("subTitle.3")}</h3>
              <p className={styles["sub-text"]}>{t("subText.3")}</p>
              <div className={styles["sub-description-wrapper"]}>
                <span>03</span>
                <p className={styles["sub-description"]}>
                  {t("subDescription.3")}
                </p>
              </div>
            </div>
            <div className={styles["image-wrapper"]}>
              <Image
                src="/images/contract-1.webp"
                alt="contract"
                width={150}
                height={150}
                quality={100}
              />
            </div>
          </li>
          <li className={styles["list-item"]}>
            <div>
              <h3 className={styles["sub-title"]}>{t("subTitle.4")}</h3>
              <p className={styles["sub-text"]}>{t("subText.4")}</p>
              <div className={styles["sub-description-wrapper"]}>
                <span>04</span>
                <p className={styles["sub-description"]}>
                  {t("subDescription.4")}
                </p>
              </div>
            </div>
            <div className={styles["image-wrapper"]}>
              <Image
                src="/images/banknotes-1.webp"
                alt="banknotes"
                width={150}
                height={150}
                quality={100}
              />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HowToGet;
