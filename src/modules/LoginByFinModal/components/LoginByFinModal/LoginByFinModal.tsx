"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLoginByFinModal } from "@/store/slices/appSlice";

import FormStep from "../FormStep/FormStep";
import styles from "./styles.module.css";

const LoginByFinModal = () => {
  const t = useTranslations("loginByFinModal");

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.loginByFinModal);

  const setLoginByFinModalClose = () => {
    dispatch(setLoginByFinModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={setLoginByFinModalClose}
    >
      <div>
        <h2 className={styles.title}>{t("title.1")}</h2>
        <FormStep />
      </div>
    </SomeComponent>
  );
};

export default LoginByFinModal;
