"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setRegisterModal } from "@/store/slices/appSlice";

import Form from "../Form/Form";
import styles from "./styles.module.css";

const RegisterModal = () => {
  const t = useTranslations("registerModal");

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.registerModal);

  const setRegisterModalClose = () => {
    dispatch(setRegisterModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={setRegisterModalClose}
    >
      <h2 className={styles.title}>{t("title.1")}</h2>
      <Form />
    </SomeComponent>
  );
};

export default RegisterModal;
