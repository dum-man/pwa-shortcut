"use client";

import { useStep } from "@/hooks";

import Agreement from "./components/Agreement/Agreement";
import Questionnaire from "./components/Questionnaire/Questionnaire";

const Page = () => {
  const [step, { goToNextStep }] = useStep(2);

  if (step === 1) {
    return <Agreement goToNextStep={goToNextStep} />;
  }

  if (step === 2) {
    return <Questionnaire />;
  }

  return null;
};

export default Page;
