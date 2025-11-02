"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LogoutIcon from "@/assets/logout-icon.svg";
import UserIcon from "@/assets/user-icon.svg";
import WalletIcon from "@/assets/wallet-icon.svg";
import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setPopoverMenu } from "@/store/slices/appSlice";
import { Popover } from "@/ui";
import { authTokenHandler, handleResetStores } from "@/utils/handlers";

import styles from "./styles.module.css";

const PopoverMenu = () => {
  const t = useTranslations("common");

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isOpen } = useAppSelector((state) => state.app.popoverMenu);

  const setPopoverMenuClose = () => {
    dispatch(setPopoverMenu({ isOpen: false }));
  };

  const handleLogout = () => {
    authTokenHandler.remove();
    handleResetStores();
    setPopoverMenuClose();
    router.replace(AppRoutes.Main);
  };

  return (
    <Popover isOpen={isOpen} onClose={setPopoverMenuClose}>
      <div className={styles["wrapper"]}>
        <ul className={styles["list"]}>
          <li className={styles["list-item"]}>
            <Link href={AppRoutes.Credit} onClick={setPopoverMenuClose}>
              <div className={styles["icon-wrapper"]}>
                <WalletIcon />
              </div>
              {t("myCredit")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <Link href={AppRoutes.User} onClick={setPopoverMenuClose}>
              <div className={styles["icon-wrapper"]}>
                <UserIcon />
              </div>
              {t("myProfile")}
            </Link>
          </li>
          <li className={styles["list-item"]}>
            <button className={styles["button"]} onClick={handleLogout}>
              <div className={styles["icon-wrapper"]}>
                <LogoutIcon />
              </div>
              {t("exit")}
            </button>
          </li>
        </ul>
      </div>
    </Popover>
  );
};

export default PopoverMenu;
