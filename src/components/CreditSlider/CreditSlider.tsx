import classNames from "classnames";
import { useTranslations } from "next-intl";

import { Slider } from "@/ui";
import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  variant?: "primary" | "secondary" | "tertiary";
  adaptive?: boolean;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const CreditSlider = (props: IProps) => {
  const { variant = "primary", min, max, value } = props;

  const t = useTranslations("calculator");

  return (
    <div
      className={classNames(styles["wrapper"], {
        [styles["primary-variant"]]: variant === "primary",
        [styles["secondary-variant"]]: variant === "secondary",
        [styles["tertiary-variant"]]: variant === "tertiary",
      })}
    >
      <div className={styles["output-sum"]}>
        <p>{t("subtitle.1")}</p>
        <span>{formatSum(value)}</span>
      </div>
      <Slider {...props} />
      <div className={styles["output-range"]}>
        <span>{formatSum(min)}</span>
        <span>{formatSum(max)}</span>
      </div>
    </div>
  );
};

export default CreditSlider;
