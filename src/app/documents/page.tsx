import { useTranslations } from "next-intl";
import Link from "next/link";

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
            <Link href={AppRoutes.DocumentsPolicy}>
              <DocumentIcon />
              {t("action.5")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <Link href={AppRoutes.DocumentsStatements}>
              <DocumentIcon />
              {t("action.6")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <Link href={AppRoutes.DocumentsDocuments}>
              <DocumentIcon />
              {t("action.7")}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
