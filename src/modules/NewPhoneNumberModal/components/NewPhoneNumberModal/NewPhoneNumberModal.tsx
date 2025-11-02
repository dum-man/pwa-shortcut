"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setNewPhoneNumberModal } from "@/store/slices/appSlice";

import AuthorizedUserForm from "../AuthorizedUserForm/AuthorizedUserForm";
import UnauthorizedUserForm from "../UnauthorizedUserForm/UnauthorizedUserForm";
import styles from "./styles.module.css";

const NewPhoneNumberModal = () => {
  const t = useTranslations("newPhoneNumberModal");

  const dispatch = useAppDispatch();

  const { isOpen, type } = useAppSelector(
    (state) => state.app.newPhoneNumberModal
  );

  const newPhoneNumberModalClose = () => {
    dispatch(setNewPhoneNumberModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={newPhoneNumberModalClose}
    >
      <h2 className={styles.title}>{t("title.1")}</h2>
      {type === "authorized" && <AuthorizedUserForm />}
      {type === "unauthorized" && <UnauthorizedUserForm />}
    </SomeComponent>
  );
};

export default NewPhoneNumberModal;
