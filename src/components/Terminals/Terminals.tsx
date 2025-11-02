import { useTranslations } from "next-intl";
import styles from "./styles.module.css";

const TERMINAL_ADDRESSES = [
  "https://maps.app.goo.gl/g4en5T6EX4RDcWbDA",
  "https://maps.app.goo.gl/gqKkQqSTiVYyRM9p7",
  "https://maps.app.goo.gl/ShnyQMoUefNRZZ3i9",
  "https://maps.app.goo.gl/c8EAT3g6LxSXysGM6",
  "https://maps.app.goo.gl/W7YtuUKHNFezpmbL9",
];

const Terminals = () => {
  const t = useTranslations("terminals");

  return (
    <ul className={styles["list"]}>
      {TERMINAL_ADDRESSES.map((item, idx) => (
        <li key={idx} className={styles["list-item"]}>
          <h3>
            {t("subtitle.1")} {idx + 1}
          </h3>
          <p>{t(`text.${idx + 1}`)}</p>
          <a href={item} target="_blank" rel="noopener noreferrer">
            {t("action.1")}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Terminals;
