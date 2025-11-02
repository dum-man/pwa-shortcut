"use client";

import { useStep } from "@/hooks";

import Scan from "./components/Scan/Scan";
import Success from "./components/Success/Success";
import styles from "./styles.module.css";

const Page = () => {
  const [step, { setStep }] = useStep(2);

  const handleSetStep = (s: number) => {
    setStep(s);
  };

  return (
    <div className={styles["wrapper"]}>
      {step === 1 && <Scan setStep={handleSetStep} />}
      {step === 2 && <Success setStep={setStep} />}
    </div>
  );
};

export default Page;
