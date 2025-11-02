"use client";

import { useEffect } from "react";

import { setDeferredPrompt } from "@/store/slices/appSlice";
import { BeforeInstallPromptEvent } from "@/types/app";

const Container = () => {
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return null;
};

export default Container;
