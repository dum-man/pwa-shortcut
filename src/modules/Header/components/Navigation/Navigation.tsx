import { useTranslations } from "next-intl";
import Link from "next/link";

import { NAV_LINKS } from "@/constants";
import styles from "./styles.module.css";

const Navigation = () => {
  const t = useTranslations("navigation");

  return (
    <nav className={styles["nav"]}>
      <ul>
        {NAV_LINKS.map((href, idx) => (
          <li key={idx}>
            <Link href={href}>{t(`action.${idx + 1}`)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
