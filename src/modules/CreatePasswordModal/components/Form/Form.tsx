import { useTranslations } from "next-intl";
import { useState } from "react";

import { useAppDispatch, useInput } from "@/hooks";
import {
  setCreatePasswordModal,
  setErrorModal,
  setInfoModal,
} from "@/store/slices/appSlice";
import { createPassword } from "@/store/slices/userSlice";
import { InfoType } from "@/types/app";
import { Button, PasswordInput } from "@/ui";
import { authTokenHandler, handleResetStores } from "@/utils/handlers";

import styles from "./styles.module.css";

// minimum 8 characters, 1 capital letter, 1 small letter, number and special character
const validatePassword = (password: string) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
};

const Form = () => {
  const t = useTranslations("createPasswordModal");

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword, setPasswordError] = useInput();
  const [confirmPassword, setConfirmPassword, setConfirmPasswordError] =
    useInput();

  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    setErrorText("");

    const formattedPassword = password.value.trim();
    const formattedConfirmPassword = confirmPassword.value.trim();

    if (!formattedPassword.length) {
      setPasswordError();
      return;
    }

    if (!formattedConfirmPassword.length) {
      setConfirmPasswordError();
      return;
    }

    if (formattedPassword !== formattedConfirmPassword) {
      setConfirmPasswordError();
      setErrorText(t("error.1"));
      return;
    }

    if (!validatePassword(formattedConfirmPassword)) {
      setErrorText(t("error.2"));
      setConfirmPasswordError();
      return;
    }

    setIsLoading(true);

    try {
      const responseText = await dispatch(
        createPassword({
          password: formattedPassword,
          confirmPassword: formattedConfirmPassword,
        })
      ).unwrap();
      // clear temp token
      authTokenHandler.remove();
      handleResetStores();
      dispatch(setCreatePasswordModal({ isOpen: false }));
      dispatch(
        setInfoModal({
          isOpen: true,
          type: InfoType.PASSWORD_SUCCESSFULLY_SET,
          messageText: responseText,
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
      <PasswordInput
        className={styles["input-wrapper"]}
        label={t("label.1")}
        hasError={password.hasError}
        value={password.value}
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <PasswordInput
        className={styles["input-wrapper"]}
        label={t("label.2")}
        hasError={confirmPassword.hasError}
        errorText={errorText}
        value={confirmPassword.value}
        onChange={(evt) => setConfirmPassword(evt.target.value)}
      />
      <Button type="submit" size="lg" isLoading={isLoading}>
        {t("action.1")}
      </Button>
    </form>
  );
};

export default Form;
