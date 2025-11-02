"use client";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInfoModal } from "@/store/slices/appSlice";
import { InfoType } from "@/types/app";

import Renderer from "../Renderer/Renderer";

const InfoModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen, type } = useAppSelector((state) => state.app.infoModal);

  const shouldModalClose = !(
    type === InfoType.CONSENT_FOR_SELFIE ||
    type === InfoType.CONSENT_FOR_VIDEO_MESSAGE ||
    type === InfoType.PASSWORD_SUCCESSFULLY_SET ||
    type === InfoType.PHONE_NUMBER_SUCCESSFULLY_CHANGED
  );

  const setInfoModalClose = () => {
    if (shouldModalClose) {
      dispatch(setInfoModal({ isOpen: false }));
    }
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside={shouldModalClose}
      withOverlay
      onClose={setInfoModalClose}
    >
      <div>
        <Renderer type={type} />
      </div>
    </SomeComponent>
  );
};

export default InfoModal;
