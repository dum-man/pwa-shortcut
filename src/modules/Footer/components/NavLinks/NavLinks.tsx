import { useTranslations } from "next-intl";
import Link from "next/link";

import { NAV_LINKS } from "@/constants";

import styles from "./styles.module.css";

const NavLinks = () => {
  const t = useTranslations("navigation");

  return (
    <ul className={styles["list"]}>
      {NAV_LINKS.map((href, idx) => (
        <li key={idx}>
          <Link href={href}>{t(`action.${idx + 1}`)}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
