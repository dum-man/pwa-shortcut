import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { AppRoutes } from "@/config/routes";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Signed = () => {
  const t = useTranslations("confirmContractSuccess");

  const router = useRouter();

  const handleClick = () => {
    sendYMEvent(YMEvent.LoanIssuedMethod);
    router.push(AppRoutes.CreditReceivingBeneficiaryQuestionnaire);
  };

  useEffect(() => {
    sendYMEvent(YMEvent.SimaAccess);
  }, []);

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <div className={styles["wrapper"]}>
          <Image
            src="/images/success-icon.webp"
            width={116}
            height={120}
            quality={100}
            alt="success"
          />
          <h2>{t("title.1")}</h2>
          <p>{t("text.1")}</p>
        </div>
        <Button size="lg" variant="primary" onClick={handleClick}>
          {t("action.1")}
        </Button>
      </div>
    </section>
  );
};

export default Signed;
