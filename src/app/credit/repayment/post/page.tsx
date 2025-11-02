import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("repaymentMethodsPage");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <div
          className={styles["content"]}
          dangerouslySetInnerHTML={{ __html: t.raw("content.3") }}
        />
        <div className={styles["image-wrapper"]}>
          <Image
            src="/images/post-1.webp"
            width={285}
            height={285}
            quality={100}
            alt="post"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
