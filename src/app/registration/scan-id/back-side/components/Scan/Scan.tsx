import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { sendYMEvent, YMEvent } from "@/analytics";
import { ScanButton } from "@/components";
import { useAppDispatch } from "@/hooks";
import { setCameraModal } from "@/store/slices/appSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  setStep: (step: number) => void;
}

const Scan = ({ setStep }: IProps) => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const setCameraModalOpen = () => {
    sendYMEvent(YMEvent.MainScanDocsContinue3);
    dispatch(
      setCameraModal({
        isOpen: true,
        type: "backId",
        onSuccess: () => {
          sendYMEvent(YMEvent.MainScanDocsSendPhotoTwo);
          setStep(2);
        },
      })
    );
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <h2>{t("scanId.title.2")}</h2>
        <ScanButton docSide="back" onClick={setCameraModalOpen} />
      </div>
      <Button size="md" variant="outline" onClick={() => router.back()}>
        {t("common.back")}
      </Button>
    </>
  );
};

export default Scan;
