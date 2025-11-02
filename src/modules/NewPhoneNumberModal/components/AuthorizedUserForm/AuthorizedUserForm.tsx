import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useNumberInput } from "@/hooks";
import {
  setErrorModal,
  setNewPhoneNumberModal,
  setOtpModal,
} from "@/store/slices/appSlice";
import {
  getCodeToChangePhoneNumber,
  setPhoneNumberToUserStore,
} from "@/store/slices/userSlice";
import { OtpType } from "@/types/app";
import { Button, PhoneInput } from "@/ui";
import { phoneFormat } from "@/utils/formats";

import styles from "./styles.module.css";

const AuthorizedUserForm = () => {
  const t = useTranslations("newPhoneNumberModal");

  const dispatch = useAppDispatch();

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

    dispatch(setPhoneNumberToUserStore(phoneNumber.value));

    setIsLoading(true);

    try {
      const { message } = await dispatch(
        getCodeToChangePhoneNumber({ newPhoneNumber: phoneNumber.value })
      ).unwrap();
      dispatch(setNewPhoneNumberModal({ isOpen: false }));
      dispatch(
        setOtpModal({
          isOpen: true,
          type: OtpType.ConfirmCodeToChangePhoneNumber,
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

export default AuthorizedUserForm;
