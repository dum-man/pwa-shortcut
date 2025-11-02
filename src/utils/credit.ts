import dayjs from "dayjs";

import { DAYS_WHEN_COMMISSION_FOR_CREDIT_NOT_CHARGED } from "@/constants";

// daily credit
export const calculateDailyCreditCommission = (days: number) => {
  if (days <= 15) {
    return 0.15;
  } else if (days <= 25) {
    return 0.2;
  } else if (days <= 35) {
    return 0.25;
  } else {
    return 0.3;
  }
};

export const calculateDailyCreditOverpaymentSum = (
  sum: number,
  days: number,
  rate: number
) => {
  const overpayment =
    sum * (days - DAYS_WHEN_COMMISSION_FOR_CREDIT_NOT_CHARGED) * (rate / 100);

  const commission = sum * calculateDailyCreditCommission(days);

  return overpayment + commission;
};

// consumer credit
export const calculateConsumerCreditCommission = (sum: number) => {
  if (sum <= 140) {
    return 0.16;
  } else if (sum <= 210) {
    return 0.15;
  } else if (sum <= 280) {
    return 0.14;
  } else if (sum <= 350) {
    return 0.13;
  } else if (sum <= 420) {
    return 0.12;
  } else if (sum <= 490) {
    return 0.11;
  } else if (sum <= 600) {
    return 0.1;
  } else {
    return 0.1;
  }
};

export const calculateConsumerCreditOverpaymentSum = (
  sum: number,
  days: number,
  rate: number
) => {
  const overpayment =
    sum * (days - DAYS_WHEN_COMMISSION_FOR_CREDIT_NOT_CHARGED) * (rate / 100);

  const commission = sum * calculateConsumerCreditCommission(sum);

  return overpayment + commission;
};

// common
export const calculateCreditTotalSum = (
  sum: number,
  overpaymentSum: number
) => {
  return sum + overpaymentSum;
};

export const getCreditRepaymentDate = (days: number) =>
  dayjs().add(days, "day").format("DD.MM.YYYY");
