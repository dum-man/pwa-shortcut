import { useTranslations } from "next-intl";
import { useState } from "react";

import { FinInput } from "@/components";
import {
  useAppDispatch,
  useAppSelector,
  useInput,
  useNumberInput,
} from "@/hooks";
import {
  setErrorModal,
  setOtpModal,
  setRegisterModal,
} from "@/store/slices/appSlice";
import {
  sendRegisterCode,
  setBirthDateToStore,
  setFinToStore,
  setPhoneNumberToAuthStore,
} from "@/store/slices/authSlice";
import { OtpType } from "@/types/app";
import { Button, Input, PhoneInput } from "@/ui";
import { phoneFormat } from "@/utils/formats";

import styles from "./styles.module.css";

const Form = () => {
  const t = useTranslations("registerModal");

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [fin, setFin, setFinError] = useInput(
    useAppSelector((state) => state.auth.fin)
  );
  const [date, setDate, setDateError] = useInput();
  const [phoneNumber, phoneNumberChange, phoneNumberErrorSet] =
    useNumberInput();

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    let hasError = false;

    const formattedFin = fin.value.trim().toUpperCase();

    if (formattedFin.length < 7) {
      hasError = true;
      setFinError();
    }

    if (!date.value) {
      hasError = true;
      setDateError();
    }

    if (!phoneFormat.test(phoneNumber.value)) {
      hasError = true;
      phoneNumberErrorSet();
    }

    if (hasError) {
      return;
    }

    dispatch(setFinToStore(formattedFin));
    dispatch(setBirthDateToStore(date.value));
    dispatch(setPhoneNumberToAuthStore(phoneNumber.value));

    setIsLoading(true);

    try {
      const message = await dispatch(
        sendRegisterCode({ phoneNumber: phoneNumber.value })
      ).unwrap();
      dispatch(setRegisterModal({ isOpen: false }));
      dispatch(
        setOtpModal({ isOpen: true, type: OtpType.RegisterByFin, message })
      );
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FinInput
        className={styles["input-wrapper"]}
        label={t("label.1")}
        hasError={fin.hasError}
        value={fin.value}
        onChange={(evt) => setFin(evt.target.value)}
      />
      <Input
        className={styles["input-wrapper"]}
        label={t("label.2")}
        type="date"
        hasError={date.hasError}
        value={date.value}
        onChange={(evt) => setDate(evt.target.value)}
      />
      <PhoneInput
        className={styles["input-wrapper"]}
        label={t("label.3")}
        allowEmptyFormatting
        hasError={phoneNumber.hasError}
        value={phoneNumber.value}
        onValueChange={phoneNumberChange}
      />
      <Button type="submit" size="lg" isLoading={isLoading}>
        {t("action.1")}
      </Button>
    </form>
  );
};

export default Form;
