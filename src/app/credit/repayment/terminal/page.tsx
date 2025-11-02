import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { AppRoutes } from "@/config/routes";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <div>
          <div
            className={styles["content"]}
            dangerouslySetInnerHTML={{
              __html: t.raw("repaymentMethodsPage.content.2"),
            }}
          />
          <Link href={AppRoutes.CreditRepaymentTerminalInfo}>
            {t("terminalRepayment.action.1")}
          </Link>
        </div>
        <div className={styles["image-wrapper"]}>
          <Image
            src="/images/terminal-1.webp"
            width={305}
            height={339}
            quality={100}
            alt="terminal"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
