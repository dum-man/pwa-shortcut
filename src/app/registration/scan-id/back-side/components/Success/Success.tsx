import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import {
  getUserState,
  uploadUserBackSideDocument,
} from "@/store/slices/userSlice";
import { Button } from "@/ui";
import { convertDataUrlToFile, getUserRoute } from "@/utils";

import styles from "./styles.module.css";

interface IProps {
  setStep: (step: number) => void;
}

const Success = ({ setStep }: IProps) => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const backId = useAppSelector((state) => state.auth.backId);

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = async () => {
    const userState = await dispatch(getUserState()).unwrap();
    const route = getUserRoute(userState);
    router.replace(route);
  };

  const handleNextStep = async () => {
    if (!backId) {
      return;
    }

    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.MainScanDocsContinueFinal);

    setIsLoading(true);
    try {
      const formData = new FormData();
      const file = await convertDataUrlToFile(backId, "file");
      formData.append("file", file);
      await dispatch(uploadUserBackSideDocument(formData)).unwrap();

      await handleNavigate();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2>{t("scanId.title.2")}</h2>
        {backId && <img src={backId} alt="back-id" />}
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
