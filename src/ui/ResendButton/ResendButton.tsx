"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useCountdown } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { formatMinutes, formatSeconds } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  onResendCode: () => Promise<void>;
}

const ResendButton = ({ onResendCode }: IProps) => {
  const t = useTranslations("otpModal");

  const dispatch = useAppDispatch();

  const [{ minutes, seconds }, resetCountdown] = useCountdown(135);

  const [isLoading, setIsLoading] = useState(false);

  const isZero = !(minutes || seconds);

  const handleGetOtpCode = async () => {
    setIsLoading(true);
    try {
      resetCountdown();
      await onResendCode();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={styles["btn"]}
      disabled={isLoading || !isZero}
      onClick={handleGetOtpCode}
      dangerouslySetInnerHTML={{
        __html: isZero
          ? t("action.1")
          : t("text.1", {
              time: `${formatMinutes(minutes)}:${formatSeconds(seconds)}`,
            }),
      }}
    />
  );
};

export default ResendButton;
