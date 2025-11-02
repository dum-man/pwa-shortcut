import { useId } from "react";

import CheckboxCheckedIcon from "@/assets/checkbox-checked-icon.svg";
import CheckboxIcon from "@/assets/checkbox-icon.svg";

import styles from "./styles.module.css";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const Checkbox = (props: CheckboxProps) => {
  const { children, checked, ...restProps } = props;

  const id = useId();

  return (
    <label className={styles["label"]} htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} hidden {...restProps} />
      {checked ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
      {children}
    </label>
  );
};

export default Checkbox;
