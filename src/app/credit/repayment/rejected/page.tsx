import { useTranslations } from "next-intl";
import Image from "next/image";

import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: IProps) => {
  const t = useTranslations();

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Image
            src="/images/reject-icon.webp"
            width={112}
            height={112}
            quality={100}
            alt="reject"
          />
          <p>{searchParams["text"]}</p>
        </div>
        <NextLink href={AppRoutes.User} size="md" variant="primary">
          {t("common.back")}
        </NextLink>
      </div>
    </section>
  );
};

export default Page;
