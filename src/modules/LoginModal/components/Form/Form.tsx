import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useNumberInput } from "@/hooks";
import {
  setErrorModal,
  setLoginModal,
  setOtpModal,
} from "@/store/slices/appSlice";
import { checkUserExists } from "@/store/slices/authSlice";
import { getOtpCode, setPhoneNumber } from "@/store/slices/otpSlice";
import { OtpType } from "@/types/app";
import { Button, PhoneInput } from "@/ui";
import { phoneFormat } from "@/utils/formats";

import styles from "./styles.module.css";

const Form = () => {
  const t = useTranslations("common");

  const dispatch = useAppDispatch();

  const [phoneNumber, phoneNumberChange, phoneNumberErrorSet] =
    useNumberInput();

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const setLoginModalClose = () => {
    dispatch(setLoginModal({ isOpen: false }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    if (!phoneFormat.test(phoneNumber.value)) {
      phoneNumberErrorSet();
      return;
    }

    sendYMEvent(YMEvent.SendSmsCode);

    dispatch(setPhoneNumber(phoneNumber.value));

    setIsLoading(true);

    try {
      const isUserExists = await dispatch(
        checkUserExists({ phoneNumber: phoneNumber.value })
      ).unwrap();
      await dispatch(getOtpCode({ phoneNumber: phoneNumber.value })).unwrap();
      setLoginModalClose();

      if (isUserExists) {
        dispatch(setOtpModal({ isOpen: true, type: OtpType.Login }));
      } else {
        dispatch(setOtpModal({ isOpen: true, type: OtpType.CheckOtp }));
      }
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className={styles["form"]} onSubmit={handleSubmit}>
      <PhoneInput
        allowEmptyFormatting
        getInputRef={inputRef}
        hasError={phoneNumber.hasError}
        value={phoneNumber.value}
        onValueChange={phoneNumberChange}
      />
      <Button size="xl" variant="primary" type="submit" isLoading={isLoading}>
        {t("getSms")}
      </Button>
    </form>
  );
};

export default Form;
