"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getActiveCredit } from "@/store/slices/creditSlice";
import { Spinner } from "@/ui";

import User from "./components/User/User";
import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getActiveCredit()).unwrap();
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
      <User />
    </section>
  );
};

export default Page;
