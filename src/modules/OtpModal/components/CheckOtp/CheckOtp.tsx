import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { OtpCode } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setOtpModal } from "@/store/slices/appSlice";
import { checkOtpCodeAndReturnTempToken } from "@/store/slices/otpSlice";

import styles from "./styles.module.css";

const CheckOtp = () => {
  const t = useTranslations("otpModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSuccess = () => {
    dispatch(setOtpModal({ isOpen: false }));
    router.push(AppRoutes.Registration);
  };

  const handleSubmit = async (otpCode: string) => {
    await dispatch(checkOtpCodeAndReturnTempToken({ code: otpCode })).unwrap();
    handleSuccess();
  };

  return (
    <div>
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default CheckOtp;
