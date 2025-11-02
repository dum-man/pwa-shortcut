import classNames from "classnames";

import styles from "./styles.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "gradient-primary"
    | "gradient-secondary"
    | "gradient-tertiary"
    | "danger";
  icon?: React.ReactNode | null;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = (props: IProps) => {
  const {
    size = "md",
    variant = "primary",
    icon = null,
    isLoading = false,
    className,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={classNames(
        styles["btn"],
        styles[size],
        styles[variant],
        className
      )}
      {...restProps}
    >
      {icon}
      {isLoading ? <span className={styles["loader"]} /> : children}
    </button>
  );
};

export default Button;
