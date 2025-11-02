"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import CloseIcon from "@/assets/close-icon.svg";

import styles from "./styles.module.css";

const overlayAnimation = {
  enter: styles["overlay-enter"],
  enterActive: styles["overlay-enter-active"],
  exit: styles["overlay-exit"],
  exitActive: styles["overlay-exit-active"],
};

const contentAnimation = {
  enter: styles["content-enter"],
  enterActive: styles["content-enter-active"],
  exit: styles["content-exit"],
  exitActive: styles["content-exit-active"],
};

interface IProps {
  isOpen: boolean;
  contentSize: "sm" | "md" | "xl";
  closeOnClickOutside: boolean;
  withOverlay: boolean;
  displayCloseBtn?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Backdrop = ({
  isOpen,
  contentSize,
  closeOnClickOutside,
  withOverlay,
  displayCloseBtn,
  onClose,
  children,
}: IProps) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={classNames(styles["container"], {
        [styles["container-paddings"]]: contentSize !== "xl",
      })}
      role="dialog"
      onClick={(evt) => evt.stopPropagation()}
    >
      {withOverlay && (
        <CSSTransition
          classNames={overlayAnimation}
          nodeRef={overlayRef}
          in={animationIn}
          timeout={200}
          mountOnEnter
          unmountOnExit
        >
          <div
            ref={overlayRef}
            role="button"
            tabIndex={0}
            className={classNames(styles["overlay"], {
              [styles["overlay-action-disabled"]]: !closeOnClickOutside,
            })}
            onClick={() => {
              if (closeOnClickOutside) onClose();
            }}
          />
        </CSSTransition>
      )}
      <CSSTransition
        classNames={contentAnimation}
        nodeRef={contentRef}
        in={animationIn}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={classNames(
            styles["content"],
            styles[`${contentSize}-size`]
          )}
          ref={contentRef}
        >
          {displayCloseBtn && (
            <button className={styles["close-btn"]} onClick={onClose}>
              <CloseIcon />
            </button>
          )}
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Backdrop;
