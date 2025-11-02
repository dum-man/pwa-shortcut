"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import LeadSlider from "../LeadSlider/LeadSlider";
import styles from "./styles.module.css";

const Container = () => {
  const ref = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(!entry.isIntersecting);
  };

  useEffect(() => {
    if (ref.current) {
      document.documentElement.style.setProperty(
        "--promo-slider-height",
        `${ref.current.clientHeight}px`
      );
    }

    const element = document.getElementById("lead")!;

    const observer = new IntersectionObserver(callbackFn, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return (
    <section
      className={classNames(styles["section"], {
        [styles["visible"]]: isVisible,
      })}
      id="lead-slider"
      ref={ref}
    >
      <LeadSlider />
    </section>
  );
};

export default Container;
