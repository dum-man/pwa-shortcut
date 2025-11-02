import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCameraModal, setErrorModal } from "@/store/slices/appSlice";
import { setBackId, setFrontId } from "@/store/slices/authSlice";
import { setSelfie } from "@/store/slices/userSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Camera = () => {
  const dispatch = useAppDispatch();

  const t = useTranslations();

  const webcamRef = useRef<Webcam>(null);

  const { type, onSuccess } = useAppSelector((state) => state.app.cameraModal);

  const [isLoaded, setIsLoaded] = useState(false);

  const setCameraModalClose = () => {
    dispatch(setCameraModal({ isOpen: false }));
  };

  const handleUserMediaError = () => {
    setCameraModalClose();
    dispatch(
      setErrorModal({ isOpen: true, errorText: "Разрешите доступ к камере" })
    );
  };

  const handleUserMedia = () => {
    setIsLoaded(true);
  };

  const capturePhoto = () => {
    if (!webcamRef.current) {
      return;
    }

    const imageSrc = webcamRef.current.getScreenshot();

    if (type === "frontId") {
      dispatch(setFrontId(imageSrc));
    } else if (type === "backId") {
      dispatch(setBackId(imageSrc));
    } else if (type === "selfie") {
      dispatch(setSelfie(imageSrc));
    }
    if (onSuccess) onSuccess();
    setCameraModalClose();
  };

  return (
    <>
      <div className={styles["camera-wrapper"]}>
        <Webcam
          autoPlay
          playsInline
          muted
          audio={false}
          ref={webcamRef}
          className={styles["camera"]}
          mirrored={type === "selfie"}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: type === "selfie" ? "user" : "environment",
          }}
          onUserMediaError={handleUserMediaError}
          onUserMedia={handleUserMedia}
        />
      </div>
      <Button
        size="lg"
        variant="primary"
        disabled={!isLoaded}
        onClick={capturePhoto}
      >
        {t("common.takePhoto")}
      </Button>
    </>
  );
};

export default Camera;
