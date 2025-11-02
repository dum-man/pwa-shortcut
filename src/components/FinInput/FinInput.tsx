import classNames from "classnames";

import { Input } from "@/ui";

import styles from "./styles.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  errorText?: string;
}

const FinInput = ({ className, ...restProps }: IProps) => {
  return (
    <Input
      className={classNames(className, styles["input-wrapper"])}
      maxLength={7}
      autoCapitalize="characters"
      pattern="[A-Za-z0-9]*"
      title="Only Latin letters and numbers are allowed"
      onChange={(evt) => evt.target.value.replace(/[^A-Za-z0-9]/g, "")}
      {...restProps}
    />
  );
};

export default FinInput;
