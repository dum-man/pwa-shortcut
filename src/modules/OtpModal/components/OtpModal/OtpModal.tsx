"use client";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setOtpModal } from "@/store/slices/appSlice";

import Renderer from "../Renderer/Renderer";

const OtpModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen, type } = useAppSelector((state) => state.app.otpModal);

  const setOtpModalClose = () => dispatch(setOtpModal({ isOpen: false }));

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside={false}
      withOverlay
      displayCloseBtn
      onClose={setOtpModalClose}
    >
      <Renderer otpType={type} />
    </SomeComponent>
  );
};

export default OtpModal;
