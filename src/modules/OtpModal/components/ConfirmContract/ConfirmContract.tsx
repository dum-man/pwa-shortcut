import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { OtpCode } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setOtpModal } from "@/store/slices/appSlice";
import { confirmCreditContractBySms } from "@/store/slices/creditSlice";

import styles from "./styles.module.css";

const ConfirmContract = () => {
  const t = useTranslations("otpModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    codeId,
    creditToReceive: { days, sum },
  } = useAppSelector((state) => state.credit);

  const handleSubmit = async (otpCode: string) => {
    await dispatch(
      confirmCreditContractBySms({
        code: otpCode,
        codeId,
        sum,
        days,
      })
    ).unwrap();
    dispatch(setOtpModal({ isOpen: false }));
    router.push(AppRoutes.CreditReceivingBeneficiaryQuestionnaire);
  };

  return (
    <div>
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default ConfirmContract;
