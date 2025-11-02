"use client";

import Image from "next/image";
import Link from "next/link";

import { LangSwitch } from "@/components";
import { AppRoutes } from "@/config/routes";
import { isWebview } from "@/utils";

import MenuButton from "../MenuButton/MenuButton";
import Navigation from "../Navigation/Navigation";
import UserButton from "../UserButton/UserButton";
import styles from "./styles.module.css";

const Header = () => {
  if (isWebview(window.navigator.userAgent)) {
    return null;
  }

  return (
    <header className={styles["header"]}>
      <div className={styles["wrapper"]}>
        <Link href={AppRoutes.Main} className={styles["logo-link"]}>
          <Image
            src="/images/logo-1.webp"
            width={141}
            height={25}
            quality={100}
            alt="Logo"
            priority
          />
        </Link>
        <LangSwitch />
        <Navigation />
        <UserButton />
        <MenuButton />
      </div>
    </header>
  );
};

export default Header;
