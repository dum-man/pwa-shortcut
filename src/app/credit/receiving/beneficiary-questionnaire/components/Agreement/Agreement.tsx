import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getAzericardPaymentUrl } from "@/store/slices/azericardSlice";
import {
  getBeneficiaryQuestionnaire,
  saveBeneficiaryResponse,
} from "@/store/slices/questionnaireSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  goToNextStep: () => void;
}

const Agreement = ({ goToNextStep }: IProps) => {
  const t = useTranslations("beneficiaryQuestionnaire");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isCardBelongsToMe, setIsCardBelongsToMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    sendYMEvent(YMEvent.LoanIssuedMain);

    if (!isCardBelongsToMe) {
      goToNextStep();
      return;
    }

    try {
      setIsLoading(true);
      const { clientId, creditId } = await dispatch(
        getBeneficiaryQuestionnaire()
      ).unwrap();

      await dispatch(
        saveBeneficiaryResponse({
          clientId,
          creditId,
          isSelfBeneficiar: true,
        })
      ).unwrap();

      const azericardUrl = await dispatch(getAzericardPaymentUrl()).unwrap();
      router.push(azericardUrl);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <h2 className={styles["title"]}>{t("title.1")}</h2>
          <p className={styles["text"]}>{t("text.1")}</p>
          <div className={styles["radio-wrapper"]}>
            <label className={styles["label"]}>
              <input
                hidden
                type="radio"
                name="radio"
                value="yes"
                checked={isCardBelongsToMe}
                onChange={() => setIsCardBelongsToMe(true)}
              />
              <span className={styles["check-mark"]} />
              {t("action.1")}
            </label>
            <label className={styles["label"]}>
              <input
                hidden
                type="radio"
                name="radio"
                value="no"
                checked={!isCardBelongsToMe}
                onChange={() => setIsCardBelongsToMe(false)}
              />
              <span className={styles["check-mark"]} />
              {t("action.2")}
            </label>
          </div>
        </div>
        <Button
          size="md"
          variant="primary"
          isLoading={isLoading}
          onClick={handleSubmit}
        >
          {t("action.3")}
        </Button>
      </div>
    </section>
  );
};

export default Agreement;
