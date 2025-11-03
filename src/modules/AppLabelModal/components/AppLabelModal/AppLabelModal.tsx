"use client";

import { useEffect, useState } from "react";

import { SomeComponent } from "@/components";
import { useAppDispatch } from "@/hooks";
import { setAppLabelModal } from "@/store/slices/appSlice";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}


const AppLabelModal = () => {

  const dispatch = useAppDispatch();


  const setAppLabelModalClose = () => {
    dispatch(setAppLabelModal({ isOpen: false }));
  };

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);


    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    setDeferredPrompt(null);
  };

  return (
    <SomeComponent
      isOpen={true}
      contentSize="md"
      closeOnClickOutside
      withOverlay
      displayCloseBtn
      onClose={setAppLabelModalClose}
    >

      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Установить приложение
        </button>
      )}
      <p>PWA 2</p>
    </SomeComponent>
  );
};

export default AppLabelModal;
