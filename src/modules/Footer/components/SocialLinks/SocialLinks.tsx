import { useTranslations } from "next-intl";

import { BOT_LINK, INSTAGRAM_LINK, POST_ADDRESS } from "@/constants";

import styles from "./styles.module.css";

const SocialLinks = () => {
  const t = useTranslations();

  return (
    <ul className={styles["list"]}>
      <li>
        <h3>{t("footer.list.1.1")}</h3>
        <a href={`mailto:${POST_ADDRESS}`}>{POST_ADDRESS}</a>
      </li>
      <li>
        <h3>{t("footer.list.1.2")}</h3>
        <a href={BOT_LINK}>Azpulmat_bot</a>
      </li>
      <li>
        <h3>{t("footer.list.1.3")}</h3>
        <a href={INSTAGRAM_LINK}>@azpulmat_promo.az</a>
      </li>
      <li>
        <h3>{t("footer.list.1.4")}</h3>
        <a dangerouslySetInnerHTML={{ __html: t("common.address") }} />
      </li>
    </ul>
  );
};

export default SocialLinks;
