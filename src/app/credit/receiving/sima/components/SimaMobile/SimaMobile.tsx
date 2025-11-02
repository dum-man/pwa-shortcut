import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import {
  SIMA_APP_STORE_LINK,
  SIMA_LINK,
  SIMA_PLAY_MARKET_LINK,
} from "@/constants";
import { useAppDispatch } from "@/hooks";
import { setErrorModal, setLoader } from "@/store/slices/appSlice";
import {
  generateSimaNavigationLink,
  getSimaOperationStatus,
} from "@/store/slices/simaSlice";
import { LoaderType } from "@/types/app";
import { ISimaOperationStatus } from "@/types/sima";
import { operationIdHandler } from "@/utils/handlers";

import styles from "./styles.module.css";

const SimaMobile = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const operationId = operationIdHandler.get();

  const [link, setLink] = useState("");

  const setLoaderOpen = () =>
    dispatch(setLoader({ isOpen: true, type: LoaderType.FULL }));

  const setLoaderClose = () =>
    dispatch(setLoader({ isOpen: false, type: LoaderType.FULL }));

  const handleSimaSigned = () => {
    setLoaderClose();
    router.push(AppRoutes.CreditReceivingSigned);
  };

  const handleSimaFailed = () => {
    setLoaderClose();
    dispatch(
      setErrorModal({ isOpen: true, errorText: t("errorModal.text.3") })
    );
    router.replace(AppRoutes.User);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(
          generateSimaNavigationLink(operationId)
        ).unwrap();
        setLink(response);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    })();
  }, [dispatch, operationId]);

  const initPollingSimaOperationStatus = () => {
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
  };

  const handleSignClick = () => {
    if (!link) return;
    setLoaderOpen();
    initPollingSimaOperationStatus();
    router.push(link);
  };

  return (
    <div className={styles["wrapper"]}>
      <h3 className={styles["subtitle"]}>{t("sima.subtitle.1")}</h3>
      <button
        className={styles["button"]}
        onClick={() => router.push(SIMA_LINK)}
      >
        {t("sima.action.1")}
      </button>
      <h3 className={styles["subtitle"]}>{t("sima.subtitle.2")}</h3>
      <button className={styles["button"]} onClick={handleSignClick}>
        {t("sima.action.2")}
      </button>
      <div className={styles["links-wrapper"]}>
        <Link href={SIMA_APP_STORE_LINK}>
          <Image
            src="/images/app-store.webp"
            alt="app-store"
            width={146}
            height={52}
            quality={100}
          />
        </Link>
        <Link href={SIMA_PLAY_MARKET_LINK}>
          <Image
            src="/images/google-play.webp"
            alt="google-play"
            width={146}
            height={52}
            quality={100}
          />
        </Link>
      </div>
      <Image
        className={styles["img"]}
        src="/images/sima-promo.webp"
        width={590}
        height={534}
        quality={100}
        alt="Sima"
      />
    </div>
  );
};

export default SimaMobile;
