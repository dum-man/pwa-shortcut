import { useTranslations } from "next-intl";

import { Terminals } from "@/components";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("terminals");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <Terminals />
      </div>
    </section>
  );
};

export default Page;
