"use client";

import MenuIcon from "@/assets/menu-icon.svg";
import { useAppDispatch } from "@/hooks";
import { setDropdownMenu } from "@/store/slices/appSlice";

import styles from "./styles.module.css";

const MenuButton = () => {
  const dispatch = useAppDispatch();

  const setDropdownMenuOpen = () => dispatch(setDropdownMenu({ isOpen: true }));

  return (
    <button
      aria-label="Open menu"
      className={styles["button"]}
      onClick={setDropdownMenuOpen}
    >
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
