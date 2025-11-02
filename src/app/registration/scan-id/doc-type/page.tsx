import { useTranslations } from "next-intl";
import Image from "next/image";

import ScanIcon from "@/assets/scan-icon.svg";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";
import { AppRoutes } from "@/config/routes";

const Page = () => {
  const t = useTranslations("docType");

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <ul className={styles["list"]}>
        <li className={styles["list-item"]}>
          <p>{t("text.1")}</p>
          <Image
            src="/images/front-ids.webp"
            width={634}
            height={225}
            quality={100}
            alt=""
          />
        </li>
        <li className={styles["list-item"]}>
          <p>{t("text.2")}</p>
          <Image
            src="/images/back-ids.webp"
            width={634}
            height={225}
            quality={100}
            alt=""
          />
        </li>
      </ul>
      <NextLink
        className={styles["link"]}
        href={AppRoutes.RegistrationScanIdFrontSide}
        variant="primary"
        size="md"
      >
        <ScanIcon width={24} height={24} /> {t("action.1")}
      </NextLink>
    </div>
  );
};

export default Page;
