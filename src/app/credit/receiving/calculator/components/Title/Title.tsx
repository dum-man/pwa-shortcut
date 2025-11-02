import { useTranslations } from "next-intl";

import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  sum: number;
  type: string;
}

const Title = ({ sum, type }: IProps) => {
  const t = useTranslations("calculator");

  return (
    <div className={styles["wrapper"]}>
      <h2>
        {t("title.1", {
          sum: formatSum(sum),
        })}
      </h2>
      <p>{type}</p>
    </div>
  );
};

export default Title;
