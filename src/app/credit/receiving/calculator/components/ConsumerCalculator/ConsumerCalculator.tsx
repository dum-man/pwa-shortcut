import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { CreditSlider } from "@/components";
import { AppRoutes } from "@/config/routes";
import { CONSUMER_CREDIT_DAILY_RATE } from "@/constants";
import { useAppDispatch, useCheckbox } from "@/hooks";
import { setErrorModal, setLoader } from "@/store/slices/appSlice";
import { setCreditToReceiveData } from "@/store/slices/creditSlice";
import { getUserState } from "@/store/slices/userSlice";
import { getCreditApplicationDoc } from "@/store/slices/viewsSlice";
import { LoaderType } from "@/types/app";
import { IUserCreditRate } from "@/types/user";
import { Button, Checkbox } from "@/ui";
import { getUserRoute } from "@/utils";
import {
  calculateConsumerCreditOverpaymentSum,
  calculateCreditTotalSum,
  getCreditRepaymentDate,
} from "@/utils/credit";
import { formatSum } from "@/utils/formats";

import Title from "../Title/Title";
import styles from "./styles.module.css";

interface IProps {
  creditRate: IUserCreditRate;
}

const ConsumerCalculator = ({ creditRate }: IProps) => {
  const { daysDefault, sumMin, sumMax, sumIncrementValue } = creditRate;

  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [creditSum, setCreditSum] = useState(sumMax);

  const [isLoading, setIsLoading] = useState(false);

  const [hasAgreedWithTerms, setHasAgreedWithTerms] = useCheckbox(false);

  const creditOverpaymentSumOn15Day = calculateConsumerCreditOverpaymentSum(
    creditSum,
    15,
    CONSUMER_CREDIT_DAILY_RATE
  );

  const creditOverpaymentSumOn30Day = calculateConsumerCreditOverpaymentSum(
    creditSum,
    30,
    CONSUMER_CREDIT_DAILY_RATE
  );

  const totalCreditSumOn15Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn15Day
  );

  const totalCreditSumOn30Day = calculateCreditTotalSum(
    creditSum,
    creditOverpaymentSumOn30Day
  );

  const handleDocOpen = async (
    evt: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    evt.stopPropagation();
    evt.preventDefault();

    dispatch(setLoader({ isOpen: true, type: LoaderType.SMALL }));

    try {
      const responseDoc = await dispatch(getCreditApplicationDoc()).unwrap();
      const blobDoc = new Blob([responseDoc], {
        type: "text/html; charset=UTF-8",
      });
      const url = URL.createObjectURL(blobDoc);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.click();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      dispatch(setLoader({ isOpen: false, type: LoaderType.SMALL }));
    }
  };

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.LoanAcceptButton);

    setIsLoading(true);

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
        hasVerifiedRequest,
      ].every((value) => value);

      dispatch(setCreditToReceiveData({ sum: creditSum, days: daysDefault }));

      // если пользователь попал на калькулятор после прохождения всех шагов => направить его на выбор способа получения
      if (isClientCompletedJourneyMap) {
        router.push(AppRoutes.CreditReceiving);
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
      <Title sum={sumMax} type="TƏKRAR KREDİT" />
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
            <span>{getCreditRepaymentDate(daysDefault)}</span>
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
            <p>{t("calculator.text.7")}</p>
            <div />
            <span>{formatSum(totalCreditSumOn30Day)}</span>
          </li>
        </ul>

        <p className={styles["remark"]}>* {t("calculator.text.4")}</p>

        <Checkbox checked={hasAgreedWithTerms} onChange={setHasAgreedWithTerms}>
          <div>
            {t.rich("calculator.action.1", {
              button: (chunks) => (
                <span
                  role="button"
                  tabIndex={0}
                  className={styles["open-doc-btn"]}
                  onClick={handleDocOpen}
                >
                  {chunks}
                </span>
              ),
            })}
          </div>
        </Checkbox>

        <br />

        <Button
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!hasAgreedWithTerms}
          onClick={handleSubmit}
        >
          {t("common.getMoney")}
        </Button>
      </div>
    </div>
  );
};

export default ConsumerCalculator;
