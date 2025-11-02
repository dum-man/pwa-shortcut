import styles from "./styles.module.css";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const DateInput = ({ ...restProps }: IProps) => {
  return (
    <label className={styles["label"]}>
      <p>Publish date</p>
      <input type="datetime-local" {...restProps} />
    </label>
  );
};

export default DateInput;
