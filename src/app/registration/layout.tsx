import { ProgressBar } from "@/components";

import styles from "./styles.module.css";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <section className={styles["section"]}>
      <ProgressBar progress={20} />
      {children}
    </section>
  );
};

export default Layout;
