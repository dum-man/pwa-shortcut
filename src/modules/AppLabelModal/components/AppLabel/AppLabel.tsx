import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useAppSelector } from "@/hooks";
import { setDeferredPrompt } from "@/store/slices/appSlice";
import { BeforeInstallPromptEvent } from "@/types/app";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const AppLabel = () => {
  const t = useTranslations("appLabelModal");

  const deferredPrompt = useAppSelector((state) => state.app.deferredPrompt);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  return (
    <div>
      <p className={styles.text}>{t("text.1")}</p>
      <Button size="lg" onClick={handleInstallClick}>
        {t("action.1")}
      </Button>
    </div>
  );
};

export default AppLabel;
