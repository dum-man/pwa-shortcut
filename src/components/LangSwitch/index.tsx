import classNames from "classnames";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/utils/locale";

import styles from "./styles.module.css";

const LangSwitch = () => {
  const locale = useLocale() as Locale;

  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <div className={styles["wrapper"]}>
      <button
        className={classNames(styles["button"], {
          [styles["active"]]: locale === "az",
        })}
        disabled={isPending}
        onClick={() => handleChange("az")}
      >
        AZ
      </button>
      /
      <button
        className={classNames(styles["button"], {
          [styles["active"]]: locale === "ru",
        })}
        disabled={isPending}
        onClick={() => handleChange("ru")}
      >
        RU
      </button>
    </div>
  );
};

export default LangSwitch;
