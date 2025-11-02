"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { sendYMEvent, YMEvent } from "@/analytics";
import { ProgressBar } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserCreditRate, getUserState } from "@/store/slices/userSlice";
import { Spinner } from "@/ui";

import ConsumerCalculator from "./components/ConsumerCalculator/ConsumerCalculator";
import DailyCalculator from "./components/DailyCalculator/DailyCalculator";
import styles from "./styles.module.css";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const creditRate = useAppSelector((state) => state.user.creditRate);

  const [isNewClient, setIsNewClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getUserCreditRate()).unwrap();
        const userState = await dispatch(getUserState()).unwrap();
        if (userState.hasActiveCredit) {
          router.replace(AppRoutes.Credit);
        } else {
          setIsNewClient(userState.isNewClient);
          setIsLoading(false);
        }
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.Main);
      }
    })();
    sendYMEvent(YMEvent.LoanAccept);
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  if (creditRate) {
    return (
      <section className={styles["section"]}>
        {!isNewClient && <ProgressBar progress={20} />}
        {isNewClient ? (
          <DailyCalculator creditRate={creditRate} />
        ) : (
          <ConsumerCalculator creditRate={creditRate} />
        )}
      </section>
    );
  }

  return null;
};

export default Page;
