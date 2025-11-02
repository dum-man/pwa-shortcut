import { useState } from "react";

import { InfoType } from "@/types/app";

import AccountDeleted from "../AccountDeleted/AccountDeleted";
import ConsentForSelfie from "../ConsentForSelfie/ConsentForSelfie";
import ConsentForVideoMessage from "../ConsentForVideoMessage/ConsentForVideoMessage";
import InAppView from "../InAppView/InAppView";
import PasswordSuccessfullySet from "../PasswordSuccessfullySet/PasswordSuccessfullySet";
import PhoneNumberSuccessfullyChanged from "../PhoneNumberSuccessfullyChanged/PhoneNumberSuccessfullyChanged";

interface IProps {
  type: InfoType | undefined;
}

const Info = ({ type }: IProps) => {
  const [infoType] = useState(() => type);

  if (infoType === InfoType.ACCOUNT_DELETED) {
    return <AccountDeleted />;
  }

  if (infoType === InfoType.IN_APP_VIEW) {
    return <InAppView />;
  }

  if (infoType === InfoType.CONSENT_FOR_SELFIE) {
    return <ConsentForSelfie />;
  }

  if (infoType === InfoType.CONSENT_FOR_VIDEO_MESSAGE) {
    return <ConsentForVideoMessage />;
  }

  if (infoType === InfoType.PASSWORD_SUCCESSFULLY_SET) {
    return <PasswordSuccessfullySet />;
  }

  if (infoType === InfoType.PHONE_NUMBER_SUCCESSFULLY_CHANGED) {
    return <PhoneNumberSuccessfullyChanged />;
  }

  return null;
};

export default Info;
