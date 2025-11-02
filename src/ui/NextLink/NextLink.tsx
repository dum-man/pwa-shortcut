import classNames from "classnames";
import Link from "next/link";
import { UrlObject } from "url";

import styles from "./styles.module.css";

interface IProps {
  href: string | UrlObject;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
}

const NextLink = (props: IProps) => {
  const {
    href,
    size = "md",
    variant = "primary",
    className,
    onClick,
    children,
  } = props;

  return (
    <Link
      href={href}
      className={classNames(
        styles["link"],
        styles[size],
        styles[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NextLink;
