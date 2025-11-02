import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useId } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";

import styles from "./styles.module.css";

interface IProps extends Omit<PatternFormatProps, "format"> {
  variant?: "primary" | "secondary";
  label?: string;
  hasError?: boolean;
}

const PhoneInput = (props: IProps) => {
  const {
    className,
    variant = "primary",
    label,
    hasError,
    ...restProps
  } = props;

  const t = useTranslations("common");

  const id = useId();

  return (
    <div className={classNames(className, styles["wrapper"])}>
      <label htmlFor={id} className={styles["label"]}>
        {label}
      </label>
      <PatternFormat
        id={id}
        className={classNames(styles["input"], {
          [styles["primary-variant"]]: variant === "primary",
          [styles["secondary-variant"]]: variant === "secondary",
        })}
        format="+994 ## ### ## ##"
        mask="_"
        {...restProps}
      />
      {hasError && (
        <span className={styles["error-message"]}>* {t("requiredField")}</span>
      )}
    </div>
  );
};

export default PhoneInput;
