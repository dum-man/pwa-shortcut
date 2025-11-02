import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import SelfieIcon from "@/assets/selfie-icon.svg";
import { useAppDispatch } from "@/hooks";
import { setCameraModal, setInfoModal } from "@/store/slices/appSlice";
import { InfoType } from "@/types/app";
import { Button } from "@/ui";

import styles from "./styles.module.css";
interface IProps {
  goToNextStep: () => void;
}

const Instructions = ({ goToNextStep }: IProps) => {
  const t = useTranslations("selfie");

  const dispatch = useAppDispatch();

  const setCameraModalOpen = () => {
    sendYMEvent(YMEvent.MainScanFaceContinue);
    dispatch(
      setCameraModal({
        isOpen: true,
        type: "selfie",
        onSuccess: () => {
          sendYMEvent(YMEvent.MainScanFaceSendPhoto);
          goToNextStep();
        },
      })
    );
  };

  useEffect(() => {
    dispatch(setInfoModal({ isOpen: true, type: InfoType.CONSENT_FOR_SELFIE }));
  }, [dispatch]);

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h2>{t("title.1")}</h2>
        <SelfieIcon width={130} height={130} />
        <p>{t("text.1")}</p>
      </div>
      <Button variant="primary" size="md" onClick={setCameraModalOpen}>
        {t("action.1")}
      </Button>
    </div>
  );
};

export default Instructions;
