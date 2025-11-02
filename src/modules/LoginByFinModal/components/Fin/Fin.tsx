import { useTranslations } from "next-intl";
import { useState } from "react";

import { FinInput } from "@/components";
import { useAppDispatch, useInput } from "@/hooks";
import {
  setErrorModal,
  setLoginByFinModal,
  setRegisterModal,
} from "@/store/slices/appSlice";
import { checkUserExistsByFin, setFinToStore } from "@/store/slices/authSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  goToNextStep: () => void;
}

const Fin = ({ goToNextStep }: IProps) => {
  const t = useTranslations("loginByFinModal");

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [fin, setFin, setFinError] = useInput();

  const handleUserNotExists = (f: string) => {
    dispatch(setFinToStore(f));
    dispatch(setLoginByFinModal({ isOpen: false }));
    dispatch(setRegisterModal({ isOpen: true }));
  };

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

    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(checkUserExistsByFin({ fin: formattedFin })).unwrap();
      goToNextStep();
    } catch (error: any) {
      // пользователь не существует
      if (error.errorCode === 404) {
        handleUserNotExists(formattedFin);
      } else {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FinInput
        className={styles["input-wrapper"]}
        label={t("label.1")}
        errorText={t("text.1")}
        hasError={fin.hasError}
        value={fin.value}
        onChange={(evt) => setFin(evt.target.value)}
      />
      <Button type="submit" size="lg" isLoading={isLoading}>
        {t("action.1")}
      </Button>
    </form>
  );
};

export default Fin;
