import classNames from "classnames";

import styles from "./styles.module.css";

interface IProps {
  fullSize?: boolean;
}

const Spinner = ({ fullSize }: IProps) => {
  return (
    <div
      className={classNames(styles["wrapper"], {
        [styles["full-size"]]: fullSize,
      })}
    >
      <span className={styles["spinner"]} />
    </div>
  );
};

export default Spinner;
