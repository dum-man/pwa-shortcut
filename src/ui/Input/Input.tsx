import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useId } from "react";

import styles from "./styles.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  note?: string;
  hasError?: boolean;
  errorText?: string;
}

const Input = (props: IProps) => {
  const { label, note, hasError, errorText, className, ...restProps } = props;

  const t = useTranslations();

  const id = useId();

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles["label"]} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={styles.input} {...restProps} />
      {hasError ? (
        <span className={styles["error-message"]}>
          {errorText ? errorText : `* ${t("common.requiredField")}`}
        </span>
      ) : (
        note && <span className={styles["note"]}>{note}</span>
      )}
    </div>
  );
};

export default Input;
