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
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Определяем iOS и standalone режим
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isStandalone = (window.navigator as any).standalone === true;

    setIsIos(isIosDevice);
    setIsInStandaloneMode(isStandalone);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      console.log("PWA установка подтверждена пользователем ✅");
    } else {
      console.log("Пользователь отклонил установку ❌");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
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
      {(isIos && !isInStandaloneMode) &&
        (
          <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-sm text-gray-800">
            Чтобы установить приложение, нажмите <b>Поделиться</b> → <b>На экран «Домой»</b>
          </div>
        )
      }

      {isVisible && (
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Установить приложение
        </button>
      )}
      <p>PWA</p>
    </SomeComponent>
  );
};

export default AppLabelModal;
