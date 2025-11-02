"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import { FinInput } from "@/components";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useInput } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { preRegister } from "@/store/slices/authSlice";
import { getUserState } from "@/store/slices/userSlice";
import { Button, MaskInput } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const formId = useId();

  const [fin, setFin, setFinError] = useInput();
  const [birthDate, setBirthDate, setBirthDateError] = useInput();

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = async () => {
    const userState = await dispatch(getUserState()).unwrap();
    if (userState.hasActiveCredit) {
      router.replace(AppRoutes.Credit);
    } else {
      router.push(AppRoutes.RegistrationScanId);
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    let hasError = false;

    const formattedFin = fin.value.trim().toUpperCase();
    const formattedBirthDate = birthDate.value
      .trim()
      .split(".")
      .reverse()
      .join("-");

    if (formattedFin.length < 7) {
      hasError = true;
      setFinError();
    }

    if (!formattedBirthDate.length) {
      hasError = true;
      setBirthDateError();
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        preRegister({
          fin: formattedFin,
          birthday: formattedBirthDate,
        })
      ).unwrap();
      await handleNavigate();
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles["wrapper"]}>
        <div>
          <h2 className={styles["title"]}>{t("register.title.1")}</h2>
          <form className={styles["form"]} id={formId} onSubmit={handleSubmit}>
            <FinInput
              label={t("register.label.1")}
              placeholder={t("register.placeholder.1")}
              hasError={fin.hasError}
              value={fin.value}
              onChange={(evt) => setFin(evt.target.value)}
            />
            <MaskInput
              format="##.##.####"
              mask=""
              placeholder={t("register.placeholder.2")}
              label={t("register.label.2")}
              value={birthDate.value}
              hasError={birthDate.hasError}
              onChange={(evt) => setBirthDate(evt.target.value)}
            />
          </form>
        </div>
        <Image
          src="/images/id-with-fin.webp"
          width={221}
          height={292}
          quality={100}
          alt=""
        />
      </div>
      <Button
        className={styles["button"]}
        type="submit"
        form={formId}
        size="md"
        variant="primary"
        isLoading={isLoading}
      >
        {t("common.submit")}
      </Button>
    </>
  );
};

export default Page;
