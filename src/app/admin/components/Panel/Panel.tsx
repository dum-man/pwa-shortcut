import { AppRoutes } from "@/config/routes";
import { NextLink } from "@/ui";

import styles from "./styles.module.css";

const Panel = () => {
  return (
    <ul className={styles["list"]}>
      <li className={styles["list-item"]}>
        <NextLink href={AppRoutes.AdminNews}>News</NextLink>
      </li>
    </ul>
  );
};

export default Panel;
