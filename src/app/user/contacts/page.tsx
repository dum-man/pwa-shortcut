"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProgressBar } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { Locale } from "@/i18n/config";
import { setErrorModal } from "@/store/slices/appSlice";
import { getContactTypes } from "@/store/slices/catalogSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Spinner } from "@/ui";
import { getUserRoute } from "@/utils";

import Contacts from "./components/Contacts/Contacts";
import styles from "./styles.module.css";

const Page = () => {
  const locale = useLocale() as Locale;

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userState = await dispatch(getUserState()).unwrap();
        if (userState.hasGuarantors) {
          const route = getUserRoute(userState);
          router.push(route);
          return;
        }
        await dispatch(getContactTypes(locale)).unwrap();
        setIsLoading(false);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.Main);
      }
    })();
  }, [dispatch, router, locale]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <ProgressBar progress={90} />
      <div className={styles["wrapper"]}>
        <Contacts />
      </div>
    </section>
  );
};

export default Page;
