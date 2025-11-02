import { useTranslations } from "next-intl";
import { useState } from "react";

import CheckIconOutline from "@/assets/check-icon-outline.svg";
import { useAppDispatch } from "@/hooks";
import {
  setCreatePasswordModal,
  setErrorModal,
  setInfoModal,
} from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const PhoneNumberSuccessfullyChanged = () => {
  const t = useTranslations("infoModal");

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const setInfoModalClose = () => {
    dispatch(setInfoModal({ isOpen: false }));
  };

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const { hasPassword } = await dispatch(getUserState()).unwrap();

      if (!hasPassword) {
        dispatch(setCreatePasswordModal({ isOpen: true }));
      }
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
      setInfoModalClose();
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <CheckIconOutline width={113} height={113} color="#3DD4C3" />
      <p>{t("text.4")}</p>
      <Button size="lg" isLoading={isLoading} onClick={handleClick}>
        Ok
      </Button>
    </div>
  );
};

export default PhoneNumberSuccessfullyChanged;
