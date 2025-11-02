"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";

import EyeIcon from "@/assets/eye-icon.svg?react.svg";
import EyeSlashIcon from "@/assets/eye-slash-icon.svg?react.svg";

import styles from "./styles.module.css";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  hasError?: boolean;
  errorText?: string;
}

const PasswordInput = ({
  label,
  hasError,
  errorText,
  className,
  ...restProps
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const t = useTranslations();

  const id = useId();

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles["input-wrapper"]}>
        <input
          className={styles.input}
          id={id}
          type={visible ? "text" : "password"}
          {...restProps}
        />
        <button
          className={styles["icon-btn"]}
          type="button"
          onClick={() => setVisible((prev) => !prev)}
        >
          {visible ? <EyeSlashIcon /> : <EyeIcon />}
        </button>
      </div>
      {hasError && (
        <span className={styles["error-message"]}>
          {errorText ? errorText : `* ${t("common.requiredField")}`}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
