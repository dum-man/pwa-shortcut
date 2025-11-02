"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProgressBar } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useStep } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Spinner } from "@/ui";
import { getUserRoute } from "@/utils";

import Instructions from "./components/Instructions/Instructions";
import Success from "./components/Success/Success";
import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [step, { goToNextStep, goToPrevStep }] = useStep(2);

  useEffect(() => {
    (async () => {
      try {
        const userState = await dispatch(getUserState()).unwrap();
        if (userState.hasSelfie) {
          const route = getUserRoute(userState);
          router.push(route);
          return;
        }
        setIsLoading(false);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.Main);
      }
    })();
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <ProgressBar progress={40} />
      {step === 1 && <Instructions goToNextStep={goToNextStep} />}
      {step === 2 && <Success goToPrevStep={goToPrevStep} />}
    </section>
  );
};

export default Page;
