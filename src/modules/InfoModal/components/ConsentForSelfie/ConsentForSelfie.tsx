import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks";
import { setInfoModal } from "@/store/slices/appSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const ConsentForSelfie = () => {
  const t = useTranslations("infoModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const setInfoModalClose = () => {
    dispatch(setInfoModal({ isOpen: false }));
  };

  const handleConfirm = () => {
    setInfoModalClose();
  };

  const handleCancel = () => {
    router.back();
    setInfoModalClose();
  };

  return (
    <div className={styles["wrapper"]}>
      <p className={styles["text"]}>{t("text.2")}</p>
      <Button
        className={styles["button"]}
        variant="primary"
        size="lg"
        onClick={handleConfirm}
      >
        {t("action.1")}
      </Button>
      <Button
        className={styles["button"]}
        variant="outline"
        size="lg"
        onClick={handleCancel}
      >
        {t("action.2")}
      </Button>
    </div>
  );
};

export default ConsentForSelfie;
