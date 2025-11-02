import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector, useInput } from "@/hooks";
import {
  setErrorModal,
  setLoginByFinModal,
  setTempPasswordModal,
} from "@/store/slices/appSlice";
import { loginByFin } from "@/store/slices/authSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";
import { Button, PasswordInput } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  goToPrevStep: () => void;
}

const Password = ({ goToPrevStep }: IProps) => {
  const t = useTranslations("loginByFinModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const idempotencyKey = useAppSelector((state) => state.auth.idempotencyKey);

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword, setPasswordError] = useInput();

  const handleChangePassword = () => {
    dispatch(setLoginByFinModal({ isOpen: false }));
    dispatch(setTempPasswordModal({ isOpen: true }));
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!idempotencyKey) {
      goToPrevStep();
      return;
    }

    if (isLoading) {
      return;
    }

    const formattedPassword = password.value.trim();

    if (!formattedPassword.length) {
      setPasswordError();
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        loginByFin({ idempotencyKey, password: formattedPassword })
      ).unwrap();
      const activeCredit = await dispatch(getActiveCredit()).unwrap();
      // если есть активный кредит открыть страницу с кредитом
      if (activeCredit) {
        router.push(AppRoutes.Credit);
      } else {
        // иначе направить пользователя на калькулятор
        router.push(AppRoutes.CreditReceivingCalculator);
      }
      dispatch(setLoginByFinModal({ isOpen: false }));
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PasswordInput
        label={t("label.2")}
        className={styles["input-wrapper"]}
        hasError={password.hasError}
        value={password.value}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <p className={styles["note"]}>{t("note.1")}</p>
      <button
        type="button"
        className={styles["text-btn"]}
        onClick={handleChangePassword}
      >
        {t("action.2")}
      </button>
      <Button type="submit" size="lg" isLoading={isLoading}>
        {t("action.1")}
      </Button>
    </form>
  );
};

export default Password;
