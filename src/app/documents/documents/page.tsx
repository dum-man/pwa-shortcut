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
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <Link href={AppRoutes.Documents2}>
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
