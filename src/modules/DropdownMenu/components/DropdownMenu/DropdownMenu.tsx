"use client";

import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import LogoutIcon from "@/assets/logout-icon.svg";
import UserIconOutline from "@/assets/user-icon-outline.svg";
import WalletIcon from "@/assets/wallet-icon.svg";
import { AppRoutes } from "@/config/routes";
import { NAV_LINKS } from "@/constants";
import { useAppDispatch, useAppSelector, useIsAndroid } from "@/hooks";
import { setDropdownMenu, setLoginByFinModal } from "@/store/slices/appSlice";
import { Dropdown } from "@/ui";
import { authTokenHandler, handleResetStores } from "@/utils/handlers";

import styles from "./styles.module.css";

const DropdownMenu = () => {
  const isAndroid = useIsAndroid();

  const t = useTranslations();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const { isOpen } = useAppSelector((state) => state.app.dropdownMenu);
  const user = useAppSelector((state) => state.user.info);
  const deferredPrompt = useAppSelector((state) => state.app.deferredPrompt);

  const setDropdownMenuClose = () => {
    dispatch(setDropdownMenu({ isOpen: false }));
  };

  const setLoginByFinModalOpen = () => {
    setDropdownMenuClose();
    dispatch(setLoginByFinModal({ isOpen: true }));
  };

  const handleLogout = () => {
    authTokenHandler.remove();
    handleResetStores();
    setDropdownMenuClose();
    router.replace(AppRoutes.Main);
  };

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
  };

  return (
    <Dropdown isOpen={isOpen} onClose={setDropdownMenuClose}>
      <div className={styles["wrapper"]}>
        <Link className={styles["logo-link"]} href={AppRoutes.Main}>
          <Image
            src="/images/logo-2.webp"
            width={116}
            height={21}
            quality={100}
            alt="logo"
          />
        </Link>

        {isAuth && (
          <p className={styles["username"]}>
            {user?.name} {user?.surname}
          </p>
        )}

        <nav className={styles["nav"]}>
          {isAuth && (
            <>
              <ul className={styles["user-list"]}>
                <li>
                  <Link href={AppRoutes.Credit} onClick={setDropdownMenuClose}>
                    {t("common.myCredit")}
                    <div className={styles["icon-wrapper"]}>
                      <WalletIcon />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={AppRoutes.User} onClick={setDropdownMenuClose}>
                    {t("common.myProfile")}
                    <div className={styles["icon-wrapper"]}>
                      <UserIconOutline />
                    </div>
                  </Link>
                </li>
                <li>
                  <button className={styles["button"]} onClick={handleLogout}>
                    {t("common.exit")}
                    <div className={styles["icon-wrapper"]}>
                      <LogoutIcon />
                    </div>
                  </button>
                </li>
              </ul>
              <div className={styles["divider"]} />
            </>
          )}

          <ul className={styles["nav-list"]}>
            {NAV_LINKS.map((href, idx) => (
              <li key={idx}>
                <Link href={href} onClick={setDropdownMenuClose}>
                  {t(`navigation.action.${idx + 1}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {!isAuth && (
          <>
            <div className={styles["divider"]} />
            <button
              className={classNames(styles["button"], styles["login-button"])}
              onClick={setLoginByFinModalOpen}
            >
              {t("common.enter")}
            </button>
            <button
              className={classNames(
                styles["button"],
                styles["register-button"],
                styles["gradient-button"]
              )}
              onClick={setLoginByFinModalOpen}
            >
              {t("common.register")}
            </button>
          </>
        )}
        {/* <Link
          href={AppRoutes.DownloadApp}
          className={styles["apk-link"]}
          onClick={setDropdownMenuClose}
        >
          {t("common.downloadApp")}
        </Link> */}
        {isAndroid && deferredPrompt && (
          <button
            className={classNames(styles["button"], styles["gradient-button"])}
            onClick={handleInstallClick}
          >
            {t("appLabelModal.action.2")}
          </button>
        )}
      </div>
    </Dropdown>
  );
};

export default DropdownMenu;
