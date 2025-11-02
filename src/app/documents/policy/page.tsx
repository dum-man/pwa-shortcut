import { useTranslations } from "next-intl";

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
            <a
              href={`${AppRoutes.Documents}/private-policy.html`}
              target="_blank"
            >
              <DocumentIcon />
              {t("action.5")}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
