import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setChangePhoneNumberModal,
  setErrorModal,
  setOtpModal,
  setTempPasswordModal,
} from "@/store/slices/appSlice";
import { sendTempPassword } from "@/store/slices/authSlice";
import { OtpType } from "@/types/app";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Form = () => {
  const t = useTranslations("tempPasswordModal");

  const dispatch = useAppDispatch();

  const { idempotencyKey, serverMessage } = useAppSelector(
    (state) => state.auth
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSendTempPassword = async () => {
    if (!idempotencyKey) {
      return; // where to redirect
    }

    setIsLoading(true);

    try {
      const { message } = await dispatch(
        sendTempPassword({ idempotencyKey })
      ).unwrap();
      dispatch(setTempPasswordModal({ isOpen: false }));
      dispatch(
        setOtpModal({ isOpen: true, type: OtpType.ConfirmTempCode, message })
      );
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className={styles.text}>{serverMessage}</p>
      <Button size="lg" isLoading={isLoading} onClick={handleSendTempPassword}>
        {t("action.1")}
      </Button>
      <p className={styles.text}>{t("text.1")}</p>
      <button
        className={styles["text-btn"]}
        onClick={() => {
          dispatch(setTempPasswordModal({ isOpen: false }));
          dispatch(setChangePhoneNumberModal({ isOpen: true }));
        }}
      >
        {t("action.2")}
      </button>
    </div>
  );
};

export default Form;
