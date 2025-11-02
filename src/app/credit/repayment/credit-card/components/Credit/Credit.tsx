import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getCreditPaymentLink } from "@/store/slices/creditSlice";
import { IActiveCredit } from "@/types/credit";
import { IUser } from "@/types/user";
import { Button } from "@/ui";
import { formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  userInfo: IUser;
  activeCredit: IActiveCredit;
}

const Credit = ({ userInfo, activeCredit }: IProps) => {
  const { name, middleName, surname } = userInfo;
  const { currentSumToReturn } = activeCredit;

  const t = useTranslations("creditCardRepayment");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleNavigate = () => {
    if (isLoading) {
      return;
    }
    if (paymentLink) {
      router.push(paymentLink);
    }
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await dispatch(getCreditPaymentLink()).unwrap();
        setPaymentLink(response);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      } finally {
        setIsLoading(false);
      }
    };
    makeRequest();
  }, [dispatch]);

  return (
    <div className={styles["wrapper"]}>
      <h2 className={styles["title"]}>
        {t("title.1")}
        <br />
        {name} {middleName} {surname}
      </h2>
      <p>
        {t("text.1")}: <b>{formatSum(currentSumToReturn)}</b>
      </p>
      <p className={styles["warning"]}>{t("text.2")}</p>
      <p className={styles["total-sum"]}>
        {t("text.3")}: {formatSum(currentSumToReturn)}
      </p>
      <Button
        size="lg"
        variant="primary"
        isLoading={isLoading}
        onClick={handleNavigate}
      >
        {t("action.1")}
      </Button>
    </div>
  );
};

export default Credit;
