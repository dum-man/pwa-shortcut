"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";

import ArrowUpIcon from "@/assets/arrow-up-icon.svg";
import { useThrottleFn } from "@/hooks";

import styles from "./styles.module.css";

const FabUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollHandler = useThrottleFn(() => {
    setIsVisible(window.scrollY > 300);
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      className={classNames(styles["fab"], {
        [styles["fab__visible"]]: isVisible,
      })}
      onClick={handleScrollToTop}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default FabUp;
