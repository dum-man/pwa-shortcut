import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { uploadUserFrontSideDocument } from "@/store/slices/userSlice";
import { Button } from "@/ui";
import { convertDataUrlToFile } from "@/utils";

import styles from "./styles.module.css";

interface IProps {
  setStep: (step: number) => void;
}

const Success = ({ setStep }: IProps) => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const frontId = useAppSelector((state) => state.auth.frontId);

  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = async () => {
    if (!frontId) {
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const file = await convertDataUrlToFile(frontId, "file");
      formData.append("file", file);
      await dispatch(uploadUserFrontSideDocument(formData)).unwrap();

      sendYMEvent(YMEvent.MainScanDocsContinue2);
      router.push(AppRoutes.RegistrationScanIdBackSide);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2>{t("scanId.title.1")}</h2>
        {frontId && <img src={frontId} alt="" />}
      </div>
      <Button
        size="md"
        variant="primary"
        isLoading={isLoading}
        onClick={handleNextStep}
      >
        {t("common.next")}
      </Button>
      <br />
      <Button size="md" variant="outline" onClick={() => setStep(1)}>
        {t("common.back")}
      </Button>
    </>
  );
};

export default Success;
