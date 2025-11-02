import { useTranslations } from "next-intl";

import { useAppSelector } from "@/hooks";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const AppLabel = () => {
  const t = useTranslations("appLabelModal");

  const deferredPrompt = useAppSelector((state) => state.app.deferredPrompt);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
  };

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
