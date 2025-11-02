"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { Contacts, CreditSlider } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal, setLoginByFinModal } from "@/store/slices/appSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";
import { IUserCreditRatePromo } from "@/types/user";
import { Button } from "@/ui";

import CreditTerms from "../CreditTerms/CreditTerms";
import styles from "./styles.module.css";

interface IProps {
  creditRate: IUserCreditRatePromo;
}

const LeadDailyCalculator = ({ creditRate }: IProps) => {
  const { sumDefault, daysDefault, sumMax, sumMin, sumIncrementValue } =
    creditRate;

  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [creditSum, setCreditSum] = useState(sumDefault);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.CashOut);

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
    // при изменении значения sumDefault, т.е. когда получим реальный rate пользователя - меняем начальное значение стейта
    setCreditSum(sumDefault);
  }, [sumDefault]);

  return (
    <div className={styles["wrapper"]}>
      <CreditSlider
        variant="primary"
        min={sumMin}
        max={sumMax}
        step={sumIncrementValue}
        value={creditSum}
        onChange={setCreditSum}
      />
      <CreditTerms creditSum={creditSum} creditDays={daysDefault} />
      <Button
        size="lg"
        variant="gradient-primary"
        isLoading={isLoading}
        onClick={handleClick}
      >
        {t("common.getMoney")}
      </Button>
      <Contacts variant="secondary" />
    </div>
  );
};

export default LeadDailyCalculator;
