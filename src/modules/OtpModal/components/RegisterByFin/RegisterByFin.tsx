import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { OtpCode } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCreatePasswordModal, setOtpModal } from "@/store/slices/appSlice";
import { registerByFin } from "@/store/slices/authSlice";
import { getUserState } from "@/store/slices/userSlice";

import styles from "./styles.module.css";

const RegisterByFin = () => {
  const t = useTranslations("otpModal");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { message } = useAppSelector((state) => state.app.otpModal);
  const { fin, phoneNumber, birthDate } = useAppSelector((state) => state.auth);

  const handleSubmit = async (otpCode: string) => {
    await dispatch(
      registerByFin({ fin, phoneNumber, birthDate, code: otpCode })
    ).unwrap();
    const { hasPassword } = await dispatch(getUserState()).unwrap();
    dispatch(setOtpModal({ isOpen: false }));
    if (hasPassword) {
      router.push(AppRoutes.User);
    } else {
      dispatch(setCreatePasswordModal({ isOpen: true }));
    }
  };

  return (
    <div>
      <h2 className={styles.title}>{t("title.2")}</h2>
      <p className={styles.text}>{message}</p>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterByFin;
