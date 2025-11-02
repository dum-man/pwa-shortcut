"use client";

import Image from "next/image";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";

import Error from "../Error/Error";
import styles from "./styles.module.css";

const ErrorModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen, errorText, errorCode, method } = useAppSelector(
    (state) => state.app.errorModal
  );

  const setErrorModalClose = () => {
    dispatch(setErrorModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside={false}
      displayCloseBtn
      withOverlay
      onClose={setErrorModalClose}
    >
      <div>
        <Image
          className={styles.img}
          src="/images/warning.webp"
          width={120}
          height={120}
          quality={100}
          alt="warning"
        />
        <Error errorText={errorText} errorCode={errorCode} method={method} />
      </div>
    </SomeComponent>
  );
};

export default ErrorModal;
