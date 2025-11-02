"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { FabUp, Spinner } from "@/ui";

import ConfirmButton from "../ConfirmButton/ConfirmButton";
import Precontract from "../Precontract/Precontract";

import styles from "./styles.module.css";

const Confirm = () => {
  const t = useTranslations("confirmContract");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { hasVerifiedRequest } = await dispatch(getUserState()).unwrap();
        if (!hasVerifiedRequest) {
          router.replace(AppRoutes.User);
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.User);
      }
    })();
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h2 className={styles["title"]}>{t("title.1")}</h2>
        <p className={styles["text"]}>{t("text.1")}</p>
        <ConfirmButton />
        <Precontract />
        <FabUp />
      </div>
    </section>
  );
};

export default Confirm;
