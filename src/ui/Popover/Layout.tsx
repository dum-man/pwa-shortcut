import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./styles.module.css";

const animation = {
  enter: styles["animation-enter"],
  enterActive: styles["animation-enter-active"],
  exit: styles["animation-exit"],
  exitActive: styles["animation-exit-active"],
};

interface IProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ isOpen, children }) => {
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  return (
    <CSSTransition
      classNames={animation}
      nodeRef={contentRef}
      in={animationIn}
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles["content"]} ref={contentRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Layout;
