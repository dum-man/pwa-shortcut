"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getContractIdToSign } from "@/store/slices/viewsSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const ConfirmButton = () => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const { sum, days } = useAppSelector((state) => state.credit.creditToReceive);

  // const { isSimaEnabled } = useAppSelector((state) => state.app.config);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.SignAgreementMethodAccess);

    setIsLoading(true);

    try {
      await dispatch(getContractIdToSign({ sum, days })).unwrap();
      router.push(AppRoutes.CreditReceivingSima);
      // if (isSimaEnabled) {
      // } else {
      //   await dispatch(getSmsCodeToConfirmCreditContract()).unwrap();
      //   dispatch(setOtpModal({ isOpen: true, type: OtpType.ConfirmContract }));
      // }
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <p
        className={styles["text"]}
        dangerouslySetInnerHTML={{ __html: t.raw("confirmContract.text.2") }}
      />
      <Button
        size="md"
        variant="primary"
        isLoading={isLoading}
        onClick={handleClick}
      >
        {t("common.submit")}
      </Button>
    </div>
  );
};

export default ConfirmButton;
