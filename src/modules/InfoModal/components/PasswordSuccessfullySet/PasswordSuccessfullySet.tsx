import { useTranslations } from "next-intl";

import CheckIconOutline from "@/assets/check-icon-outline.svg";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInfoModal, setLoginByFinModal } from "@/store/slices/appSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const PasswordSuccessfullySet = () => {
  const t = useTranslations("infoModal");

  const dispatch = useAppDispatch();

  const { messageText } = useAppSelector((state) => state.app.infoModal);

  const setInfoModalClose = () => {
    dispatch(setInfoModal({ isOpen: false }));
    dispatch(setLoginByFinModal({ isOpen: true }));
  };

  return (
    <div className={styles["wrapper"]}>
      <CheckIconOutline width={113} height={113} color="#3DD4C3" />
      <p>{messageText || t("text.5")}</p>
      <Button size="lg" onClick={setInfoModalClose}>
        Ok
      </Button>
    </div>
  );
};

export default PasswordSuccessfullySet;
