import LeadSlider from "@/modules/LeadSlider";

import Advantages from "./components/Advantages";
import AppPromo from "./components/AppPromo";
import Contacts from "./components/Contacts";
import Faq from "./components/Faq";
import HowToGet from "./components/HowToGet";
import Lead from "./components/Lead/Lead";
import RepaymentMethods from "./components/RepaymentMethods";
import TerminalsInfo from "./components/TerminalsInfo";

const Page = () => {
  return (
    <>
      <Lead />
      <LeadSlider />
      <HowToGet />
      <Advantages />
      <RepaymentMethods />
      <Faq />
      <AppPromo />
      <Contacts />
      <TerminalsInfo />
    </>
  );
};

export default Page;
