"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getOtpCode } from "@/store/slices/otpSlice";
import { Button, OtpInput, ResendButton } from "@/ui";
import { createDigitsArray } from "@/utils";

import styles from "./styles.module.css";

interface IProps {
  digitsCount: number;
  onError: () => void;
  onSubmit: (otpCode: string) => Promise<void>;
}

const OtpCode = ({ digitsCount, onError, onSubmit }: IProps) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const phoneNumber = useAppSelector((state) => state.otp.phoneNumber);

  const [otpCode, setOtpCode] = useState(() => createDigitsArray(digitsCount));
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetOtpCode = async () => {
    await dispatch(getOtpCode({ phoneNumber })).unwrap();
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    const formattedOtpCode = otpCode.join("");

    setIsLoading(true);

    try {
      await onSubmit(formattedOtpCode);
    } catch (error: any) {
      setHasError(true);
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = otpCode.some((digit) => !digit);

  return (
    <div className={styles["wrapper"]}>
      <form className={styles["form"]} onSubmit={handleSubmit}>
        <OtpInput
          hasError={hasError}
          setHasError={setHasError}
          otpCode={otpCode}
          setOtpCode={setOtpCode}
        />
        <Button
          type="submit"
          size="md"
          variant="primary"
          isLoading={isLoading}
          disabled={isDisabled}
        >
          {t("common.send")}
        </Button>
      </form>
      {/* <ResendButton onResendCode={handleGetOtpCode} /> */}
    </div>
  );
};

export default OtpCode;
