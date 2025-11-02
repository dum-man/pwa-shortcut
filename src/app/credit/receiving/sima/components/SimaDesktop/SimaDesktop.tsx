import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import {
  generateSimaNavigationQr,
  getSimaOperationStatus,
} from "@/store/slices/simaSlice";
import { ISimaOperationStatus } from "@/types/sima";
import { operationIdHandler } from "@/utils/handlers";

import styles from "./styles.module.css";

const SimaDesktop = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const operationId = operationIdHandler.get();

  const [qr, setQr] = useState("");

  const handleSimaSigned = () => {
    router.push(AppRoutes.CreditReceivingSigned);
  };

  const handleSimaFailed = () => {
    dispatch(
      setErrorModal({ isOpen: true, errorText: t("errorModal.text.3") })
    );
    router.replace(AppRoutes.User);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(
          generateSimaNavigationQr(operationId)
        ).unwrap();
        setQr(URL.createObjectURL(response));
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    })();
  }, [dispatch, operationId]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const pollSimaOperationStatus = async () => {
      try {
        const operationStatus = await dispatch(
          getSimaOperationStatus(operationId)
        ).unwrap();
        if (operationStatus === ISimaOperationStatus.Signed) {
          clearTimeout(timeoutId);
          handleSimaSigned();
        } else if (operationStatus === ISimaOperationStatus.Failed) {
          handleSimaFailed();
        } else {
          timeoutId = setTimeout(pollSimaOperationStatus, 3000);
        }
      } catch (error: any) {
        timeoutId = setTimeout(pollSimaOperationStatus, 3000);
      }
    };

    pollSimaOperationStatus();

    return () => clearTimeout(timeoutId);
  }, [dispatch, router, operationId]);

  return (
    <div className={styles["wrapper"]}>
      <div>
        <h3>{t("sima.subtitle.1")}</h3>
        <p>{t("sima.text.1")}</p>
        <br />
        <Image
          src="/images/sima-app-qr.webp"
          width={300}
          height={300}
          quality={100}
          alt="QR"
        />
      </div>
      <div>
        <Image
          src="/images/sima-promo.webp"
          width={590}
          height={534}
          quality={100}
          alt="Sima"
        />
      </div>
      <div>
        <h3>{t("sima.subtitle.2")}</h3>
        <p>{t("sima.text.2")}</p>
        <Image src={qr} width={300} height={300} quality={100} alt="QR" />
      </div>
    </div>
  );
};

export default SimaDesktop;
