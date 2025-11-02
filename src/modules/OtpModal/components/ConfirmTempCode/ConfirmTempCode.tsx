import { useTranslations } from "next-intl";

import { OtpCode } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCreatePasswordModal, setOtpModal } from "@/store/slices/appSlice";
import { confirmTempPassword } from "@/store/slices/authSlice";

import styles from "./styles.module.css";

const ConfirmTempCode = () => {
  const t = useTranslations("otpModal");

  const dispatch = useAppDispatch();

  const { message } = useAppSelector((state) => state.app.otpModal);
  const { phoneNumber, idempotencyKey } = useAppSelector((state) => state.auth);

  const handleSubmit = async (otpCode: string) => {
    await dispatch(
      confirmTempPassword({ tempPassword: otpCode, idempotencyKey })
    ).unwrap();
    dispatch(setOtpModal({ isOpen: false }));
    dispatch(setCreatePasswordModal({ isOpen: true }));
  };

  return (
    <div>
      <h2 className={styles.title}>{t("title.2")}</h2>
      <p className={styles.text}>{message}</p>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default ConfirmTempCode;
