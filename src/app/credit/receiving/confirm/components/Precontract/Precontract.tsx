"use client";

import { Spinner } from "@/ui";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getPreContractDoc } from "@/store/slices/viewsSlice";

import styles from "./styles.module.css";

const Precontract = () => {
  const dispatch = useAppDispatch();

  const { sum, days } = useAppSelector((state) => state.credit.creditToReceive);

  const [precontract, setPrecontract] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(
          getPreContractDoc({ sum, days, creditLimitCalcType: "2" })
        ).unwrap();
        setPrecontract(response);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (precontract) {
    return (
      <div className={styles["wrapper"]}>
        <div
          className={styles["precontract"]}
          dangerouslySetInnerHTML={{ __html: precontract }}
        />
      </div>
    );
  }

  return null;
};

export default Precontract;
