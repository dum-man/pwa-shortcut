import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { checkAzericardPaymentCompleted } from "@/store/slices/azericardSlice";
import { NextLink } from "@/ui";

const CreditAction = () => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const isPaymentNotCompleted = await dispatch(
          checkAzericardPaymentCompleted()
        ).unwrap();

        setIsPaymentCompleted(!isPaymentNotCompleted);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  if (!isPaymentCompleted) {
    return (
      <NextLink
        href={AppRoutes.CreditReceivingBeneficiaryQuestionnaire}
        size="lg"
        variant="primary"
      >
        {t("common.getMoney")}
      </NextLink>
    );
  }

  return (
    <NextLink href={AppRoutes.CreditRepayment} size="lg" variant="primary">
      {t("common.repayCredit")}
    </NextLink>
  );
};

export default CreditAction;
