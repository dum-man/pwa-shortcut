"use client";

import { useStep } from "@/hooks";

import Instructions from "./components/Instructions/Instructions";
import Success from "./components/Success/Success";
import styles from "./styles.module.css";

const Page = () => {
  const [step, { goToNextStep, goToPrevStep }] = useStep(2);

  return (
    <section className={styles["section"]}>
      {step === 1 && <Instructions goToNextStep={goToNextStep} />}
      {step === 2 && <Success goToPrevStep={goToPrevStep} />}
    </section>
  );
};

export default Page;
