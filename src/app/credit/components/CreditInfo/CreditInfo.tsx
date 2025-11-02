import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/hooks";
import { setErrorModal, setLoader } from "@/store/slices/appSlice";
import { getContractDoc } from "@/store/slices/viewsSlice";
import { LoaderType } from "@/types/app";
import { IActiveCredit, ICreditType } from "@/types/credit";
import { formatDate, formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

interface IProps {
  activeCredit: IActiveCredit;
}

const CreditInfo = ({ activeCredit }: IProps) => {
  const {
    getSum,
    dueDate,
    contractDays,
    currentSumToReturn,
    genCreditNumberValue,
    genCreditNumberId,
    type,
  } = activeCredit;

  const t = useTranslations();

  const dispatch = useAppDispatch();

  const handleContractClick = async () => {
    dispatch(setLoader({ isOpen: true, type: LoaderType.SMALL }));

    try {
      const response = await dispatch(
        getContractDoc(String(genCreditNumberId))
      ).unwrap();
      const url = URL.createObjectURL(response);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.click();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      dispatch(setLoader({ isOpen: false, type: LoaderType.SMALL }));
    }
  };

  return (
    <>
      <h2 className={styles["title"]}>
        {type === ICreditType.DAILY ? "İlk kredit" : "Təkrar kredit"}
      </h2>
      <div className={styles["wrapper"]}>
        <ul className={styles["list"]}>
          <li>
            {t("activeCredit.text.1")}
            <p>{formatSum(getSum)}</p>
          </li>
          <li>
            {t("activeCredit.text.2")}
            <p>
              {contractDays} {t("common.days")}
            </p>
          </li>
          <li>
            {t("activeCredit.text.3")}
            <p>{formatDate(dueDate)}</p>
          </li>
          <li>
            {t("activeCredit.text.4")}
            <p>{formatSum(currentSumToReturn)}</p>
          </li>
          <li>
            {t("activeCredit.text.5")}
            <button onClick={handleContractClick}>
              №{genCreditNumberValue}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CreditInfo;
