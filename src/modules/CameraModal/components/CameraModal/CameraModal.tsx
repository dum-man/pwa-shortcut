"use client";

import { useTranslations } from "next-intl";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector, useMediaQuery } from "@/hooks";
import { setCameraModal } from "@/store/slices/appSlice";

import Camera from "../Camera/Camera";
import styles from "./styles.module.css";

const CameraModal = () => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const { isOpen, type } = useAppSelector((state) => state.app.cameraModal);

  const isMobile = useMediaQuery("(max-width: 430px)");

  const setCameraModalClose = () => {
    dispatch(setCameraModal({ isOpen: false }));
  };
  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize={isMobile ? "xl" : "md"}
      displayCloseBtn={isMobile}
      closeOnClickOutside
      withOverlay
      onClose={setCameraModalClose}
    >
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>
          {type === "frontId" && t("scanId.title.1")}
          {type === "backId" && t("scanId.title.2")}
        </h2>
        <Camera />
      </div>
    </SomeComponent>
  );
};

export default CameraModal;
