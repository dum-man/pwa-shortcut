import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { sendYMEvent, YMEvent } from "@/analytics";
import { OtpCode } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setOtpModal } from "@/store/slices/appSlice";
import { authenticateBySmsCode } from "@/store/slices/authSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";

import styles from "./styles.module.css";

const Login = () => {
  const t = useTranslations("otpModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleSubmit = async (otpCode: string) => {
    sendYMEvent(YMEvent.LoginUser);
    await dispatch(authenticateBySmsCode(otpCode)).unwrap();
    const activeCredit = await dispatch(getActiveCredit()).unwrap();
    // если есть активный кредит открыть страницу с кредитом
    if (activeCredit) {
      router.push(AppRoutes.Credit);
    } else {
      // иначе направить пользователя на калькулятор
      router.push(AppRoutes.CreditReceivingCalculator);
    }
    dispatch(setOtpModal({ isOpen: false }));
  };

  return (
    <div>
      <h2 className={styles["title"]}>{t("title.1")}</h2>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
