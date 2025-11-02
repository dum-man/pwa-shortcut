import { useTranslations } from "next-intl";

import DocumentIcon from "@/assets/document-icon.svg";
import { AppRoutes } from "@/config/routes";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("documents");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <a
              href={`${AppRoutes.Documents}/2024-ci-il-üzrə-maliyyə-hesabatı.pdf`}
              target="_blank"
            >
              <DocumentIcon />
              {t("action.1")}
            </a>
          </li>
          <li className={styles["list-item"]}>
            <a
              href={`${AppRoutes.Documents}/2023-ci-il-üzrə-maliyyə-hesabatı.pdf`}
              target="_blank"
            >
              <DocumentIcon />
              {t("action.2")}
            </a>
          </li>
          <li className={styles["list-item"]}>
            <a
              href={`${AppRoutes.Documents}/2022-ci-il-üzrə-maliyyə-hesabatı.pdf`}
              target="_blank"
            >
              <DocumentIcon />
              {t("action.3")}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
