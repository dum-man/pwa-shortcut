import { useAppSelector } from "@/hooks";

import CreditAction from "../CreditAction/CreditAction";
import CreditInfo from "../CreditInfo/CreditInfo";

const ActiveCredit = () => {
  const activeCredit = useAppSelector((state) => state.credit.activeCredit);

  if (activeCredit) {
    return (
      <>
        <CreditInfo activeCredit={activeCredit} />
        <CreditAction />
      </>
    );
  }

  return null;
};

export default ActiveCredit;
