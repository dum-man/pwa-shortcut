import { useTranslations } from "next-intl";
import { useId } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import styles from "./styles.module.css";

interface IProps extends Omit<NumericFormatProps, "suffix"> {
  label?: string;
  hasError?: boolean;
}

const CurrencyInput = (props: IProps) => {
  const { label, hasError, ...restProps } = props;

  const t = useTranslations("common");

  const id = useId();

  return (
    <div className={styles["wrapper"]}>
      <label htmlFor={id} className={styles["label"]}>
        {label}
      </label>
      <NumericFormat
        className={styles["input"]}
        id={id}
        thousandSeparator
        suffix=" ₼"
        placeholder="₼"
        {...restProps}
      />
      {hasError && (
        <span className={styles["error-message"]}>* {t("requiredField")}</span>
      )}
    </div>
  );
};

export default CurrencyInput;
