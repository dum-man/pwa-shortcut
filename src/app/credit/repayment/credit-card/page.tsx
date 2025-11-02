"use client";

import { Spinner } from "@/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";

import Credit from "./components/Credit/Credit";
import styles from "./styles.module.css";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.user.info);
  const activeCredit = useAppSelector((state) => state.credit.activeCredit);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const activeCreditResponse = await dispatch(getActiveCredit()).unwrap();
        if (!activeCreditResponse) {
          router.replace(AppRoutes.User);
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

  if (userInfo && activeCredit) {
    return (
      <section className={styles["section"]}>
        <Credit userInfo={userInfo} activeCredit={activeCredit} />
      </section>
    );
  }

  return null;
};

export default Page;
