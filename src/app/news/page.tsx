"use client";

import { useTranslations } from "next-intl";

import { useMediaQuery } from "@/hooks";
import {
  PostsFeedWithInfiniteScroll,
  PostsFeedWithPagination,
} from "@/modules/PostsFeed";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations("news");

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        {isMobile ? (
          <PostsFeedWithInfiniteScroll />
        ) : (
          <PostsFeedWithPagination />
        )}
      </div>
    </section>
  );
};

export default Page;
