import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FinInput } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useInput } from "@/hooks";
import {
  setChangePhoneNumberModal,
  setErrorModal,
} from "@/store/slices/appSlice";
import { checkUserExistsByFin } from "@/store/slices/authSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Form = () => {
  const t = useTranslations("changePhoneNumberModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [fin, setFin, setFinError] = useInput();

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
      dispatch(setChangePhoneNumberModal({ isOpen: false }));
      router.push(AppRoutes.VerifyUnauthorizedUser);
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

export default Form;
