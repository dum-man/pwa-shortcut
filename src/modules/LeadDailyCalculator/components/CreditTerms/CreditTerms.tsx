import { useTranslations } from "next-intl";

import { DAILY_CREDIT_DAILY_RATE } from "@/constants";
import { getCreditRepaymentDate } from "@/utils/credit";
import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

const multiplyOnPercent = (value: number, percent: number) => {
  return value * (percent / 100);
};

const calculateCreditPercentSum = (value: number, k: number) => {
  return multiplyOnPercent(value, DAILY_CREDIT_DAILY_RATE) * k;
};

interface IProps {
  creditSum: number;
  creditDays: number;
}

const CreditTerms = ({ creditDays, creditSum }: IProps) => {
  const t = useTranslations();

  const creditCommissionSumOn15Day = multiplyOnPercent(creditSum, 15);
  const creditCommissionSumOn25Day = multiplyOnPercent(creditSum, 20);
  const creditCommissionSumOn35Day = multiplyOnPercent(creditSum, 25);
  const creditCommissionSumOn45Day = multiplyOnPercent(creditSum, 30);

  const creditPercentSumOn15Day = calculateCreditPercentSum(creditSum, 10);
  const creditPercentSumOn25Day = calculateCreditPercentSum(creditSum, 20);
  const creditPercentSumOn35Day = calculateCreditPercentSum(creditSum, 30);
  const creditPercentSumOn45Day = calculateCreditPercentSum(creditSum, 40);

  const totalCreditSumOn15Day =
    creditSum + creditCommissionSumOn15Day + creditPercentSumOn15Day;

  const totalCreditSumOn25Day =
    creditSum + creditCommissionSumOn25Day + creditPercentSumOn25Day;

  const totalCreditSumOn35Day =
    creditSum + creditCommissionSumOn35Day + creditPercentSumOn35Day;

  const totalCreditSumOn45Day =
    creditSum + creditCommissionSumOn45Day + creditPercentSumOn45Day;

  return (
    <div className={styles["wrapper"]}>
      <ul className={styles["list"]}>
        <li>
          <p>{t("calculator.text.1")}</p>
          <span>{formatSum(creditSum)}</span>
        </li>
        <li>
          <p>{t("calculator.text.2")}</p>
          <span>{`${creditDays} ${t("common.days")}`}</span>
        </li>
        <li>
          <p>{t("calculator.text.3")}</p>
          {/* Дата возврата для ежедневного кредита расчитывается по формуле: дата оформления + 45 дней - 1 день */}
          <span>{getCreditRepaymentDate(creditDays - 1)}</span>
        </li>
      </ul>

      <div className={styles["table"]}>
        <div className={styles["tc"]}>
          <span>{t("calculator.table.th.1")}</span>
          <span>{t("calculator.table.td.1")}</span>
          <span>{t("calculator.table.td.2")}</span>
          <span>{t("calculator.table.td.3")}</span>
          <span>{t("calculator.table.td.4")}</span>
        </div>
        <div className={styles["tc"]}>
          <span>{t("calculator.table.th.2")}</span>
          <span>{formatSum(creditCommissionSumOn15Day)}</span>
          <span>{formatSum(creditCommissionSumOn25Day)}</span>
          <span>{formatSum(creditCommissionSumOn35Day)}</span>
          <span>{formatSum(creditCommissionSumOn45Day)}</span>
        </div>
        <div className={styles["tc"]}>
          <span>{t("calculator.table.th.3")}</span>
          <span>{formatSum(creditPercentSumOn15Day)}</span>
          <span>{formatSum(creditPercentSumOn25Day)}</span>
          <span>{formatSum(creditPercentSumOn35Day)}</span>
          <span>{formatSum(creditPercentSumOn45Day)}</span>
        </div>
        <div className={styles["tc"]}>
          <span>{t("calculator.table.th.4")}</span>
          <span>{formatSum(totalCreditSumOn15Day)}</span>
          <span>{formatSum(totalCreditSumOn25Day)}</span>
          <span>{formatSum(totalCreditSumOn35Day)}</span>
          <span>{formatSum(totalCreditSumOn45Day)}</span>
        </div>
      </div>
      <p className={styles["note"]}>{t("calculator.note.1")}</p>
    </div>
  );
};

export default CreditTerms;
