import { useTranslations } from "next-intl";

import InfoIcon from "@/assets/info-icon.svg";

import styles from "./styles.module.css";

const InAppView = () => {
  const t = useTranslations("infoModal");

  return (
    <div className={styles["wrapper"]}>
      <InfoIcon width={150} height={150} color="#3dd4c3" />
      <p>{t("text.1")}</p>
    </div>
  );
};

export default InAppView;
