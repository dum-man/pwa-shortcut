"use client";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setTempPasswordModal } from "@/store/slices/appSlice";

import Form from "../Form/Form";

const TempPasswordModal = () => {
  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.tempPasswordModal);

  const setTempPasswordModalClose = () => {
    dispatch(setTempPasswordModal({ isOpen: false }));
  };

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      onClose={setTempPasswordModalClose}
    >
      <Form />
    </SomeComponent>
  );
};

export default TempPasswordModal;
