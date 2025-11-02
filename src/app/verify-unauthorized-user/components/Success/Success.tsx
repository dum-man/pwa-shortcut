import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal, setNewPhoneNumberModal } from "@/store/slices/appSlice";
import { verifyUnauthorizedUserSelfie } from "@/store/slices/authSlice";
import { setSelfie } from "@/store/slices/userSlice";
import { Button } from "@/ui";
import { convertDataUrlToFile } from "@/utils";

import styles from "./styles.module.css";

interface IProps {
  goToPrevStep: () => void;
}

const Success = ({ goToPrevStep }: IProps) => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const selfie = useAppSelector((state) => state.user.selfie);
  const idempotencyKey = useAppSelector((state) => state.auth.idempotencyKey);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    goToPrevStep();
    dispatch(setSelfie(null));
  };

  const handleNextButtonClick = async () => {
    if (!selfie) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const selfiePhoto = await convertDataUrlToFile(selfie, "selfiePhoto");
      await dispatch(
        verifyUnauthorizedUserSelfie({
          idempotencyKey,
          selfiePhoto,
        })
      ).unwrap();
      router.push(AppRoutes.Main);
      dispatch(setNewPhoneNumberModal({ isOpen: true, type: "unauthorized" }));
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
