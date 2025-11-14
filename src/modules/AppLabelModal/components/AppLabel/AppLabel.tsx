import { useTranslations } from "next-intl";

import { useAppSelector } from "@/hooks";
import { Button } from "@/ui";


const AppLabel = () => {
  const t = useTranslations("appLabelModal");

  const deferredPrompt = useAppSelector((state) => state.app.deferredPrompt);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
  };

  return (
    <div>
      <Button size="lg" onClick={handleInstallClick}>
        {t("action.1")}
      </Button>
    </div>
  );
};

export default AppLabel;
