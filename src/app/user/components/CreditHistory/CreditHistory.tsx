import classNames from "classnames";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import ArrowDownIcon from "@/assets/arrow-down-icon.svg";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getCreditHistory } from "@/store/slices/userSlice";
import { formatDate, formatSum } from "@/utils/formats";

import styles from "./styles.module.css";

const CreditHistory = () => {
  const t = useTranslations("creditHistory");

  const dispatch = useAppDispatch();

  const creditHistory = useAppSelector((state) => state.user.creditHistory);

  const [sliceNumber, setSliceNumber] = useState(3);

  const handleSetSliceNumber = () => {
    if (sliceNumber === creditHistory.length) {
      setSliceNumber(3);
    } else {
      setSliceNumber(creditHistory.length);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCreditHistory()).unwrap();
      } catch (error) {}
    })();
  }, [dispatch]);

  if (creditHistory.length) {
    return (
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <ul className={styles["list"]}>
          {creditHistory
            .slice(0, sliceNumber)
            .map(({ contractId, createDate, creditId, status, sum }) => (
              <li key={creditId} className={styles["list-item"]}>
                <p>№ {contractId}</p>
                <div className={styles["list-item-wrapper"]}>
                  <p>{formatSum(sum)}</p>
                  <p>
                    {t("text.1")} {formatDate(createDate)}
                  </p>
                  <p
                    className={classNames({
                      [styles["credit__active"]]: status === "Active",
                    })}
                  >
                    {t(`status.${status.toLowerCase()}`)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
        {creditHistory.length > 3 && (
          <button
            className={classNames(styles["toggle-show-btn"], {
              [styles["toggle-show-btn__active"]]: sliceNumber > 3,
            })}
            onClick={handleSetSliceNumber}
          >
            {sliceNumber <= 3 ? t("action.1") : t("action.2")}
            <ArrowDownIcon />
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default CreditHistory;
