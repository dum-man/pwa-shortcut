"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { sendYMEvent, YMEvent } from "@/analytics";
import ArrowDownIcon from "@/assets/arrow-down-icon.svg";
import UserIcon from "@/assets/user-icon.svg";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLoginByFinModal, setPopoverMenu } from "@/store/slices/appSlice";

import styles from "./styles.module.css";

const UserButton = () => {
  const t = useTranslations("common");

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.popoverMenu);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.user.info);
  const userPhoto = useAppSelector((state) => state.user.photo);

  const setLoginByFinModalOpen = () => {
    sendYMEvent(YMEvent.LoginButton);
    dispatch(setLoginByFinModal({ isOpen: true }));
  };

  const setPopoverMenuOpen = () => {
    dispatch(setPopoverMenu({ isOpen: true }));
  };

  if (isAuth) {
    return (
      <button
        className={classNames(styles["button"], styles["user-button"], {
          [styles["user-button__active"]]: isOpen,
        })}
        onClick={setPopoverMenuOpen}
      >
        <ArrowDownIcon />
        {`${user?.name} ${user?.surname[0]}.`}
        {userPhoto ? (
          <Image src={userPhoto} width={30} height={45} alt="ID" />
        ) : (
          <div className={styles["icon-wrapper"]}>
            <UserIcon width={18} height={18} />
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      className={classNames(styles["button"], styles["login-button"])}
      onClick={setLoginByFinModalOpen}
    >
      {t("enter")} / {t("register")}
    </button>
  );
};

export default UserButton;
