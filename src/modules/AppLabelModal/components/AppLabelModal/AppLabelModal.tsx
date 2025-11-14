"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { SomeComponent } from "@/components";
import { useAppDispatch, useAppSelector, useIsAndroid } from "@/hooks";
import { setAppLabelModal } from "@/store/slices/appSlice";

import AppLabel from "../AppLabel/AppLabel";

const AppLabelModal = () => {

  const isAndroid = useIsAndroid();

  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.appLabelModal);
  const deferredPrompt = useAppSelector((state) => state.app.deferredPrompt);

  const setAppLabelModalClose = () => {
    dispatch(setAppLabelModal({ isOpen: false }));
  };

  useEffect(() => {
    if (
      pathname === "/" &&
      isAndroid &&
      deferredPrompt
    ) {
      setTimeout(() => {
        dispatch(setAppLabelModal({ isOpen: true }));
      }, 5000);
    }
  }, [pathname, dispatch, isAndroid, deferredPrompt]);

  return (
    <SomeComponent
      isOpen={isOpen}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      displayCloseBtn
      onClose={setAppLabelModalClose}
    >

      <AppLabel />
    </SomeComponent>
  );
};

export default AppLabelModal;
