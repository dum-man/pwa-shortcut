import { useTranslations } from "next-intl";

import { Spinner } from "@/ui";

import styles from "./styles.module.css";

const FullLoader = () => {
  const t = useTranslations("loader");

  return (
    <div className={styles["wrapper"]}>
      <Spinner />
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <p
        className={styles["text"]}
        dangerouslySetInnerHTML={{ __html: t.raw("text.1") }}
      />
    </div>
  );
};

export default FullLoader;
