import { useTranslations } from "next-intl";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("documents");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}></li>
        </ul>
      </div>
    </section>
  );
};

export default Page;
