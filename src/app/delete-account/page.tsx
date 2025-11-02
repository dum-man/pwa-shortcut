"use client";

import { useState } from "react";

import { useAppDispatch, useNumberInput } from "@/hooks";
import { setErrorModal, setInfoModal } from "@/store/slices/appSlice";
import { InfoType } from "@/types/app";
import { Button, PhoneInput } from "@/ui";
import { phoneFormat } from "@/utils/formats";

import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const [phoneNumber, phoneNumberChange, phoneNumberErrorSet] =
    useNumberInput();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (isLoading) {
      return;
    }

    if (!phoneFormat.test(phoneNumber.value)) {
      phoneNumberErrorSet();
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((res) => {
        setTimeout(() => {
          res(null);
        }, 1500);
      });
      dispatch(setInfoModal({ isOpen: true, type: InfoType.ACCOUNT_DELETED }));
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, ...error }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles["section"]}>
      <div className={styles["wrapper"]}>
        <h1 className={styles["title"]}>Hesabın silinməsi</h1>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <PhoneInput
            allowEmptyFormatting
            hasError={phoneNumber.hasError}
            value={phoneNumber.value}
            onValueChange={phoneNumberChange}
          />
          <br />
          <Button
            size="xl"
            variant="primary"
            type="submit"
            isLoading={isLoading}
          >
            Sorğu göndərin
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Page;
