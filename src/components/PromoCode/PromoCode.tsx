import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";

import { useAppDispatch, useInput } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { checkPromoCodeAvailable } from "@/store/slices/promoCodeSlice";
import { Button, Input } from "@/ui";

import styles from "./styles.module.css";

interface IProps {
  discountRate: number;
  setDiscountRate: Dispatch<SetStateAction<number>>;
}

const PromoCode = ({ discountRate, setDiscountRate }: IProps) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [promoCode, onPromoCodeChange, onPromoCodeErrorSet] = useInput();
  const [promoCodeErrorMessage, setPromoCodeErrorMessage] = useState("");

  const handleApplyPromoCode = async () => {
    if (isLoading) {
      return;
    }

    const formattedPromoCode = promoCode.value.trim();

    if (!formattedPromoCode) {
      onPromoCodeErrorSet();
      return;
    }

    setIsLoading(true);

    try {
      const { statusCode, discountValue, message } = await dispatch(
        checkPromoCodeAvailable({ promoCode: formattedPromoCode })
      ).unwrap();
      // promo code valid if statusCode = 0
      if (statusCode === 0) {
        setDiscountRate(discountValue);
      } else {
        onPromoCodeErrorSet();
        setPromoCodeErrorMessage(message);
      }
    } catch (error: any) {
      onPromoCodeErrorSet();
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePromoCode = () => {
    setDiscountRate(0);
  };

  return (
    <div className={styles["wrapper"]}>
      <Input
        placeholder={t("calculator.placeholder.1")}
        value={promoCode.value}
        hasError={promoCode.hasError}
        errorText={promoCodeErrorMessage}
        onChange={(evt) => onPromoCodeChange(evt.target.value)}
      />
      {discountRate ? (
        <Button
          type="button"
          size="sm"
          variant="danger"
          onClick={handleDeletePromoCode}
        >
          {t("common.delete")}
        </Button>
      ) : (
        <Button
          type="button"
          size="xs"
          variant="primary"
          isLoading={isLoading}
          onClick={handleApplyPromoCode}
        >
          {t("common.apply")}
        </Button>
      )}
    </div>
  );
};

export default PromoCode;
