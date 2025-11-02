import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { CreditSlider } from "@/components";
import { AppRoutes } from "@/config/routes";
import {
  CONSUMER_CREDIT_DAILY_RATE,
  CREDIT_DAYS_PROMO,
  CREDIT_SUM_STEP,
  DAILY_CREDIT_DAILY_RATE,
  DEFAULT_CONSUMER_CREDIT_SUM,
  DEFAULT_DAILY_CREDIT_SUM,
  MAX_CONSUMER_CREDIT_SUM,
  MAX_DAILY_CREDIT_SUM,
  MIN_CONSUMER_CREDIT_SUM,
  MIN_DAILY_CREDIT_SUM,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectCreditRateForPromo } from "@/selectors";
import { setErrorModal, setLoginByFinModal } from "@/store/slices/appSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";
import { Button } from "@/ui";
import {
  calculateConsumerCreditOverpaymentSum,
  calculateCreditTotalSum,
  calculateDailyCreditOverpaymentSum,
} from "@/utils/credit";
import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

const LeadSlider = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const inFocusCalculator = useAppSelector(
    (state) => state.ui.inFocusCalculator
  );

  const creditRate = useAppSelector(selectCreditRateForPromo);

  const [creditSum, setCreditSum] = useState(DEFAULT_CONSUMER_CREDIT_SUM);
  const [isLoading, setIsLoading] = useState(false);

  const minSum = useMemo(() => {
    if (isAuth && creditRate) {
      return creditRate.sumMin;
    }

    if (inFocusCalculator === "consumer") {
      return MIN_CONSUMER_CREDIT_SUM;
    } else {
      return MIN_DAILY_CREDIT_SUM;
    }
  }, [isAuth, creditRate, inFocusCalculator]);

  const maxSum = useMemo(() => {
    if (isAuth && creditRate) {
      return creditRate.sumMax;
    }

    if (inFocusCalculator === "consumer") {
      return MAX_CONSUMER_CREDIT_SUM;
    } else {
      return MAX_DAILY_CREDIT_SUM;
    }
  }, [isAuth, creditRate, inFocusCalculator]);

  const creditOverpaymentSum = useMemo(() => {
    if (inFocusCalculator === "consumer") {
      return calculateConsumerCreditOverpaymentSum(
        creditSum,
        CREDIT_DAYS_PROMO,
        CONSUMER_CREDIT_DAILY_RATE
      );
    } else {
      return calculateDailyCreditOverpaymentSum(
        creditSum,
        CREDIT_DAYS_PROMO,
        DAILY_CREDIT_DAILY_RATE
      );
    }
  }, [creditSum, inFocusCalculator]);

  const totalCreditSum = useMemo(() => {
    return calculateCreditTotalSum(creditSum, creditOverpaymentSum);
  }, [creditSum, creditOverpaymentSum]);

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.CashOut2);

    if (!isAuth) {
      dispatch(setLoginByFinModal({ isOpen: true }));
      return;
    }

    try {
      setIsLoading(true);
      const activeCredit = await dispatch(getActiveCredit()).unwrap();
      if (activeCredit) {
        router.push(AppRoutes.Credit);
      } else {
        router.push(AppRoutes.CreditReceivingCalculator);
      }
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuth && creditRate) {
      setCreditSum(creditRate.sumMax);
      return;
    }

    if (inFocusCalculator === "consumer") {
      setCreditSum(DEFAULT_CONSUMER_CREDIT_SUM);
    } else {
      setCreditSum(DEFAULT_DAILY_CREDIT_SUM);
    }
  }, [isAuth, creditRate, inFocusCalculator]);

  return (
    <div className={styles["wrapper"]}>
      <div>
        <CreditSlider
          adaptive={false}
          min={minSum}
          max={maxSum}
          step={CREDIT_SUM_STEP}
          value={creditSum}
          onChange={setCreditSum}
        />
        <p className={styles["sum"]}>
          {`${t("common.returnSum")} ${formatSum(totalCreditSum)}`}
        </p>
      </div>
      <div className={styles["divider"]} />
      <div>
        <Button
          size="xl"
          variant="gradient-primary"
          isLoading={isLoading}
          onClick={handleClick}
        >
          {t("common.getMoney")}
        </Button>
      </div>
    </div>
  );
};

export default LeadSlider;
