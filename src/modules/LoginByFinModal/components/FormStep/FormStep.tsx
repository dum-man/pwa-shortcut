import { useStep } from "@/hooks";

import Fin from "../Fin/Fin";
import Password from "../Password/Password";

const FormStep = () => {
  const [currentStep, { goToNextStep, goToPrevStep }] = useStep(2);

  if (currentStep === 1) {
    return <Fin goToNextStep={goToNextStep} />;
  }

  if (currentStep === 2) {
    return <Password goToPrevStep={goToPrevStep} />;
  }

  return null;
};

export default FormStep;
