import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useAppSelector, useNumberInput } from "@/hooks";
import {
  setErrorModal,
  setNewPhoneNumberModal,
  setOtpModal,
} from "@/store/slices/appSlice";
import {
  getCodeToChangePhoneNumberForUnauthorizedUser,
  setPhoneNumberToAuthStore,
} from "@/store/slices/authSlice";
import { OtpType } from "@/types/app";
import { Button, PhoneInput } from "@/ui";
import { phoneFormat } from "@/utils/formats";

import styles from "./styles.module.css";

const UnauthorizedUserForm = () => {
  const t = useTranslations("newPhoneNumberModal");

  const dispatch = useAppDispatch();

  const idempotencyKey = useAppSelector((state) => state.auth.idempotencyKey);

  const [phoneNumber, phoneNumberChange, phoneNumberErrorSet] =
    useNumberInput();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    if (!phoneFormat.test(phoneNumber.value)) {
      phoneNumberErrorSet();
      return;
    }

    dispatch(setPhoneNumberToAuthStore(phoneNumber.value));

    setIsLoading(true);

    try {
      const { message } = await dispatch(
        getCodeToChangePhoneNumberForUnauthorizedUser({
          idempotencyKey,
          newPhoneNumber: phoneNumber.value,
        })
      ).unwrap();
      dispatch(setNewPhoneNumberModal({ isOpen: false }));
      dispatch(
        setOtpModal({
          isOpen: true,
          type: OtpType.ConfirmCodeToChangePhoneNumberForUnauthorizedUser,
          message,
        })
      );
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PhoneInput
        className={styles.input}
        allowEmptyFormatting
        hasError={phoneNumber.hasError}
        value={phoneNumber.value}
        onValueChange={phoneNumberChange}
      />
      <Button type="submit" size="lg">
        {t("action.1")}
      </Button>
    </form>
  );
};

export default UnauthorizedUserForm;
