"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLoginModal } from "@/store/slices/appSlice";

import Form from "../Form/Form";
import styles from "./styles.module.css";

const LoginModal = () => {
  const t = useTranslations("loginModal");

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.loginModal);

  const setLoginModalClose = () => {
    dispatch(setLoginModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={setLoginModalClose}
    >
      <div>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <p className={styles["text"]}>{t("text.1")}</p>
        <Form />
      </div>
    </SomeComponent>
  );
};

export default LoginModal;
