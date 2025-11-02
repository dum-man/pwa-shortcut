"use client";

import { AppRoutes } from "@/config/routes";
import { PostsFeedWithPagination } from "@/modules/PostsFeed";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <NextLink href={AppRoutes.AdminNewsCreate}>Create new post</NextLink>
        <br />
        <PostsFeedWithPagination isAdmin />
      </div>
    </section>
  );
};

export default Page;
