import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import {
  getUserState,
  setSelfie,
  uploadUserSelfie,
} from "@/store/slices/userSlice";
import { Button } from "@/ui";
import { convertDataUrlToFile, getUserRoute } from "@/utils";

import styles from "./styles.module.css";

interface IProps {
  goToPrevStep: () => void;
}

const Success = ({ goToPrevStep }: IProps) => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const selfie = useAppSelector((state) => state.user.selfie);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    goToPrevStep();
    dispatch(setSelfie(null));
  };

  const handleSelfieUpload = async (selfie: string) => {
    const formData = new FormData();
    const file = await convertDataUrlToFile(selfie, "file");
    formData.append("file", file);
    await dispatch(uploadUserSelfie(formData)).unwrap();
  };

  const handleNextButtonClick = async () => {
    if (!selfie) {
      return;
    }

    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.MainInfoClCredit);

    setIsLoading(true);

    try {
      await handleSelfieUpload(selfie);

      const userState = await dispatch(getUserState()).unwrap();

      const route = getUserRoute(userState);

      router.replace(route);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h2>{t("selfie.title.1")}</h2>
        {selfie && <img src={selfie} alt="" />}
      </div>
      <Button
        size="lg"
        variant="primary"
        isLoading={isLoading}
        onClick={handleNextButtonClick}
      >
        {t("common.next")}
      </Button>
      <Button size="lg" variant="outline" onClick={handleGoBack}>
        {t("common.back")}
      </Button>
    </div>
  );
};

export default Success;
