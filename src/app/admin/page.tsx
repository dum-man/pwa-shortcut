"use client";

import { useAppSelector } from "@/hooks";
import Auth from "./components/Auth/Auth";
import Panel from "./components/Panel/Panel";
import styles from "./styles.module.css";

const Page = () => {
  const isAuth = useAppSelector((state) => state.admin.isAuth);

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>{isAuth ? <Panel /> : <Auth />}</div>
    </section>
  );
};

export default Page;
