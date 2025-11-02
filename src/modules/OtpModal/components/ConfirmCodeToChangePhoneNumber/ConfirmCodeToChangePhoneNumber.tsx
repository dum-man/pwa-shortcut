import { useTranslations } from "next-intl";

import { OtpCode } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInfoModal, setOtpModal } from "@/store/slices/appSlice";
import { confirmCodeToChangePhoneNumber } from "@/store/slices/userSlice";
import { InfoType } from "@/types/app";

import styles from "./styles.module.css";

const ConfirmCodeToChangePhoneNumber = () => {
  const t = useTranslations("otpModal");

  const dispatch = useAppDispatch();

  const { message } = useAppSelector((state) => state.app.otpModal);
  const { phoneNumber, idempotencyKey } = useAppSelector((state) => state.user);

  const handleSubmit = async (otpCode: string) => {
    await dispatch(
      confirmCodeToChangePhoneNumber({
        idempotencyKey,
        newPhoneNumber: phoneNumber,
        smsCode: otpCode,
      })
    ).unwrap();
    dispatch(setOtpModal({ isOpen: false }));
    dispatch(
      setInfoModal({
        isOpen: true,
        type: InfoType.PHONE_NUMBER_SUCCESSFULLY_CHANGED,
      })
    );
  };

  return (
    <div>
      <h2 className={styles.title}>{t("title.2")}</h2>
      <p className={styles.text}>{message}</p>
      <OtpCode digitsCount={4} onError={() => {}} onSubmit={handleSubmit} />
    </div>
  );
};

export default ConfirmCodeToChangePhoneNumber;
