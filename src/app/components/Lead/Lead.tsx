"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

import { DAILY_CREDIT_RATE } from "@/constants";
import { useAppSelector } from "@/hooks";
import LeadDailyCalculator from "@/modules/LeadDailyCalculator";
import { selectCreditRateForPromo } from "@/selectors";
import { IUserCreditRatePromo } from "@/types/user";

import styles from "./styles.module.css";

const LeadSwiper = dynamic(() => import("@/modules/LeadSwiper"), {
  ssr: false,
  loading: () => <div className={styles["loading-placeholder"]} />,
});

const Lead = () => {
  const t = useTranslations();

  const creditRate = useAppSelector(selectCreditRateForPromo);

  const renderCalculator = () => {
    const dailyCalculatorRate: IUserCreditRatePromo = creditRate
      ? creditRate
      : DAILY_CREDIT_RATE;

    return (
      <div className={styles["daily-calculator"]}>
        <button
          className={classNames(
            styles["tab-button"],
            styles["tab-button-daily"]
          )}
        >
          {t("calculator.title.2")}
        </button>
        <LeadDailyCalculator creditRate={dailyCalculatorRate} />
      </div>
    );
  };

  return (
    <section id="lead" className={styles["section"]}>
      <LeadSwiper />
      <div className={styles["wrapper"]}>
        <div className={styles["alert"]}>
          <p>
            {t.rich("lead.text.1", {
              link: (link) => <a href={`tel:${link}`}>{link}</a>,
              br: () => <br />,
            })}
          </p>
        </div>
        {renderCalculator()}
      </div>
    </section>
  );
};

export default Lead;
