import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

import styles from "./styles.module.css";

interface MaskInputProps extends PatternFormatProps {
  label?: string;
  hasError?: boolean;
}

const MaskInput = (props: MaskInputProps) => {
  const { label, hasError, value, ...restProps } = props;

  const t = useTranslations("common");

  const id = useId();

  return (
    <div
      className={classNames(styles["wrapper"], {
        [styles["active"]]: Boolean(value),
      })}
    >
      <label htmlFor={id} className={styles["label"]}>
        {label}
      </label>
      <PatternFormat
        id={id}
        className={styles["input"]}
        value={value}
        {...restProps}
      />
      {hasError && (
        <span className={styles["error-message"]}>
          {`* ${t("requiredField")}`}
        </span>
      )}
    </div>
  );
};

export default MaskInput;
