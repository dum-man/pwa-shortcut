"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";
import { Spinner } from "@/ui";

import ActiveCredit from "./components/ActiveCredit/ActiveCredit";
import styles from "./styles.module.css";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const activeCreditResponse = await dispatch(getActiveCredit()).unwrap();
        if (!activeCreditResponse) {
          router.push(AppRoutes.User);
          return;
        }
        setIsLoading(false);
      } catch (error: any) {
        router.replace(AppRoutes.Main);
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    })();
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <ActiveCredit />
    </section>
  );
};

export default Page;
