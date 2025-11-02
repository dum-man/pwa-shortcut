import { Spinner } from "@/ui";
import styles from "./styles.module.css";

const SmallLoader = () => {
  return (
    <div className={styles["wrapper"]}>
      <Spinner />
    </div>
  );
};

export default SmallLoader;
