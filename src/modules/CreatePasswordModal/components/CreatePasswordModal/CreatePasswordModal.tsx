"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCreatePasswordModal } from "@/store/slices/appSlice";

import Form from "../Form/Form";
import styles from "./styles.module.css";

const CreatePasswordModal = () => {
  const t = useTranslations("createPasswordModal");

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.createPasswordModal);

  const setCreatePasswordModalClose = () => {
    dispatch(setCreatePasswordModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={setCreatePasswordModalClose}
    >
      <h2 className={styles.title}>{t("title.1")}</h2>
      <Form />
    </SomeComponent>
  );
};

export default CreatePasswordModal;
