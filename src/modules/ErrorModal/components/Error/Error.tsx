import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal, setLoginByFinModal } from "@/store/slices/appSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  errorText: string | undefined;
  errorCode: number | undefined;
  method: string | undefined;
}

const Error = ({ errorText, errorCode, method }: IProps) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [error] = useState(() => ({ errorText, errorCode, method }));

  const isUnauthorizedError = error.errorCode === 401;
  const isUserBlockedError = error.errorCode === 406;

  const isUnknownError = error.errorText === "Unknown error";

  const shouldDisplayMethod = error.method && !isUnauthorizedError;
  const shouldDisplayErrorCode = error.errorCode && !isUnauthorizedError;

  const setErrorModalClose = () => {
    dispatch(setErrorModal({ isOpen: false }));
  };

  const setLoginByFinModalOpen = () => {
    dispatch(setLoginByFinModal({ isOpen: true }));
  };

  useEffect(() => {
    if (isUnauthorizedError || isUserBlockedError) {
      router.replace(AppRoutes.Main);
    }
  }, [router]);

  if (isUnauthorizedError) {
    return (
      <div className={styles["wrapper"]}>
        <p>{t("errorModal.text.2")}</p>
        <Button
          size="xl"
          variant="primary"
          onClick={() => {
            setErrorModalClose();
            setLoginByFinModalOpen();
          }}
        >
          {t("common.enter")}
        </Button>
      </div>
    );
  }

  return (
    <div className={styles["wrapper"]}>
      {isUnknownError && <h2>{t("errorModal.title.1")}</h2>}
      <p>{error.errorText}</p>
      {shouldDisplayMethod && (
        <p className={styles["method"]}>
          {error.method}{" "}
          {shouldDisplayErrorCode && <span>({error.errorCode})</span>}
        </p>
      )}
      <Button size="xl" variant="primary" onClick={setErrorModalClose}>
        Ok
      </Button>
    </div>
  );
};

export default Error;
