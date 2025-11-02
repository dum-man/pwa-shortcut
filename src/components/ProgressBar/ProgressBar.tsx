import { useTranslations } from "next-intl";

import CheckIcon from "@/assets/check-icon.svg";

import styles from "./styles.module.css";

interface IProps {
  progress: number;
}

const points = [20, 50, 100];

const ProgressBar = ({ progress }: IProps) => {
  const t = useTranslations("common");

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["bar"]}>
        <span
          className={styles["progress"]}
          style={{ width: `${progress}%` }}
        />
        <ul className={styles["points-list"]}>
          {points.map((point) => (
            <li key={point} className={styles["point-item"]}>
              {progress >= point ? (
                <CheckIcon width={16} height={16} />
              ) : (
                <span className={styles["dot"]} />
              )}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles["text"]}>
        {t("progress", {
          progress,
        })}
      </p>
    </div>
  );
};

export default ProgressBar;
