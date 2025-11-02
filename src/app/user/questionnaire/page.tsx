"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProgressBar } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Spinner } from "@/ui";
import { getUserRoute } from "@/utils";

import Questionnaire from "./components/Questionnaire/Questionnaire";
import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userState = await dispatch(getUserState()).unwrap();
        if (!userState.needClientProfile) {
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
      <ProgressBar progress={60} />
      <Questionnaire />
    </section>
  );
};

export default Page;
