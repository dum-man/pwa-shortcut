import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { AppRoutes } from "@/config/routes";
import { APP_STORE_LINK } from "@/constants";

import styles from "./styles.module.css";

const AppPromo = () => {
  const t = useTranslations("appPromo");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <div>
          <h2 className={styles["title"]}>{t("title.1")}</h2>
          <Image
            className={classNames(styles["image"], styles["image-mobile"])}
            src="/images/app-promo.webp"
            alt="application"
            width={450}
            height={338}
            quality={100}
          />
          <p className={styles["text"]}>
            {t.rich("text.1", {
              br: () => <br />,
              link: (text) => <Link href={AppRoutes.Documents2}>{text}</Link>,
            })}
          </p>
          <div className={styles["links-wrapper"]}>
            <a href={APP_STORE_LINK} target="_blank">
              <Image
                src="/images/app-store.webp"
                alt="app-store"
                width={146}
                height={52}
                quality={100}
              />
            </a>
            {/* <a href={PLAY_MARKET_LINK} target="_blank">
              <Image
                src="/images/google-play.webp"
                alt="google-play"
                width={146}
                height={52}
                quality={100}
              />
            </a> */}
          </div>
        </div>
        <Image
          className={classNames(styles["image"], styles["image-desktop"])}
          src="/images/app-promo.webp"
          alt="application"
          width={600}
          height={451}
          quality={100}
        />
      </div>
    </section>
  );
};

export default AppPromo;
