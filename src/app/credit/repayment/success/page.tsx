import { useTranslations } from "next-intl";
import Image from "next/image";

import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("creditRepaymentSuccess");

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Image
            src="/images/warning.webp"
            width={120}
            height={120}
            quality={100}
            alt="success"
          />
          <p>
            {t.rich("text.1", {
              br: () => <br />,
              link: (chunk) => <a href={`tel:${chunk}`}>{chunk}</a>,
            })}
          </p>
        </div>
        <NextLink href={AppRoutes.User} size="md" variant="primary">
          {t("action.1")}
        </NextLink>
      </div>
    </section>
  );
};

export default Page;
