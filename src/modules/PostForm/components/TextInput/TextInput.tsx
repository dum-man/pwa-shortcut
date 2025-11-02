import styles from "./styles.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const MAX_LENGTH = 256;

const TextInput = ({ label, value, ...restProps }: IProps) => {
  return (
    <label className={styles["label"]}>
      {label && <p>{label}</p>}
      <input value={value} maxLength={MAX_LENGTH} {...restProps} />
      <span className={styles["count"]}>
        {(value as string).length}/{MAX_LENGTH}
      </span>
    </label>
  );
};

export default TextInput;
