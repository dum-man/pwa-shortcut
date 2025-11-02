import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { CreditSlider } from "@/components";
import { AppRoutes } from "@/config/routes";
import { DAILY_CREDIT_DAILY_RATE } from "@/constants";
import { useAppDispatch, useCheckbox } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { setCreditToReceiveData } from "@/store/slices/creditSlice";
import { getUserState } from "@/store/slices/userSlice";
import { IUserCreditRate } from "@/types/user";
import { Button, Checkbox } from "@/ui";
import { getUserRoute } from "@/utils";
import {
  calculateCreditTotalSum,
  calculateDailyCreditOverpaymentSum,
  getCreditRepaymentDate,
} from "@/utils/credit";
import { formatSum } from "@/utils/formats";

import Title from "../Title/Title";
import styles from "./styles.module.css";

interface IProps {
  creditRate: IUserCreditRate;
}

const DailyCalculator = ({ creditRate }: IProps) => {
  const { daysDefault, sumMin, sumMax, sumIncrementValue } = creditRate;

  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [creditSum, setCreditSum] = useState(sumMax);
  const [isAgreedWithPrivacyPolicy, setIsAgreedWithPrivacyPolicy] =
    useCheckbox(false);
  const [isLoading, setIsLoading] = useState(false);

  const creditOverpaymentSumOn15Day = calculateDailyCreditOverpaymentSum(
    creditSum,
    15,
    DAILY_CREDIT_DAILY_RATE
  );

  const creditOverpaymentSumOn25Day = calculateDailyCreditOverpaymentSum(
    creditSum,
    25,
    DAILY_CREDIT_DAILY_RATE
  );

  const creditOverpaymentSumOn35Day = calculateDailyCreditOverpaymentSum(
    creditSum,
    35,
    DAILY_CREDIT_DAILY_RATE
  );

  const creditOverpaymentSumOn45Day = calculateDailyCreditOverpaymentSum(
    creditSum,
    45,
    DAILY_CREDIT_DAILY_RATE
  );

  const totalCreditSumOn15Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn15Day
  );

  const totalCreditSumOn25Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn25Day
  );

  const totalCreditSumOn35Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn35Day
  );

  const totalCreditSumOn45Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn45Day
  );

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    sendYMEvent(YMEvent.LoanAcceptButton);

    try {
      const userState = await dispatch(getUserState()).unwrap();

      const {
        hasDocumentFrontSide,
        hasDocumentBackSide,
        hasSelfie,
        needClientProfile,
        isVideoAttached,
        hasGuarantors,
        hasVerifiedRequest,
      } = userState;

      const isClientCompletedJourneyMap = [
        hasDocumentFrontSide,
        hasDocumentBackSide,
        hasSelfie,
        !needClientProfile,
        isVideoAttached,
        hasGuarantors,
      ].every((value) => value);

      dispatch(setCreditToReceiveData({ sum: creditSum, days: daysDefault }));

      // если пользователь попал на калькулятор после прохождения всех шагов и есть верификация => направить его на выбор способа получения
      if (isClientCompletedJourneyMap && hasVerifiedRequest) {
        router.push(AppRoutes.CreditReceiving);
        // если все шаги пройдены, но нет верификации => направить на верификацию
      } else if (isClientCompletedJourneyMap && !hasVerifiedRequest) {
        router.push(AppRoutes.CreditReceivingVerification);
      } else {
        // иначе определить и направить его на соответствующий шаг
        const route = getUserRoute(userState);
        router.replace(route);
      }
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <Title sum={sumMax} type="İLK KREDIT" />
      <div className={styles["wrapper"]}>
        <CreditSlider
          variant="secondary"
          adaptive={false}
          min={sumMin}
          max={sumMax}
          step={sumIncrementValue}
          value={creditSum}
          onChange={setCreditSum}
        />
        <div className={styles["divider"]} />

        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.1")}:</p>
            <div />
            <span>{formatSum(creditSum)}</span>
          </li>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.2")}:</p>
            <div />
            <span>
              {daysDefault} {t("common.days")}
            </span>
          </li>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.3")}:</p>
            <div />
            {/* Дата возврата для ежедневного кредита расчитывается по формуле: дата оформления + 45 дней - 1 день */}
            <span>{getCreditRepaymentDate(daysDefault - 1)}</span>
          </li>
        </ul>
        <h3 className={styles["subtitle"]}>{t("calculator.subtitle.2")}:</h3>

        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.5")}</p>
            <div />
            <span>{formatSum(totalCreditSumOn15Day)}</span>
          </li>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.6")}</p>
            <div />
            <span>{formatSum(totalCreditSumOn25Day)}</span>
          </li>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.8")}</p>
            <div />
            <span>{formatSum(totalCreditSumOn35Day)}</span>
          </li>
          <li className={styles["list-item"]}>
            <p>{t("calculator.text.9")}</p>
            <div />
            <span>{formatSum(totalCreditSumOn45Day)}</span>
          </li>
        </ul>

        <p className={styles["remark"]}>* {t("calculator.text.4")}</p>

        <Button
          size="lg"
          variant="primary"
          disabled={!isAgreedWithPrivacyPolicy}
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {t("common.getMoney")}
        </Button>

        <br />

        <Checkbox
          checked={isAgreedWithPrivacyPolicy}
          onChange={setIsAgreedWithPrivacyPolicy}
        >
          <div>
            {t.rich("calculator.action.2", {
              link: (text) => (
                <Link
                  className={styles["checkbox-link"]}
                  href={`${AppRoutes.Documents}/private-policy.html`}
                >
                  {text}
                </Link>
              ),
            })}
          </div>
        </Checkbox>
      </div>
    </div>
  );
};

export default DailyCalculator;
