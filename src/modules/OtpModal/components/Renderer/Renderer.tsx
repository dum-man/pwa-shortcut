import { useState } from "react";

import { OtpType } from "@/types/app";

import CheckOtp from "../CheckOtp/CheckOtp";
import ConfirmCodeToChangePhoneNumber from "../ConfirmCodeToChangePhoneNumber/ConfirmCodeToChangePhoneNumber";
import ConfirmCodeToChangePhoneNumberForUnauthorizedUser from "../ConfirmCodeToChangePhoneNumberForUnauthorizedUser/ConfirmCodeToChangePhoneNumberForUnauthorizedUser";
import ConfirmContract from "../ConfirmContract/ConfirmContract";
import ConfirmTempCode from "../ConfirmTempCode/ConfirmTempCode";
import Login from "../Login/Login";
import RegisterByFin from "../RegisterByFin/RegisterByFin";

interface IProps {
  otpType: OtpType | undefined;
}

const Renderer = ({ otpType }: IProps) => {
  const [type] = useState(() => otpType);

  if (type === OtpType.Login) {
    return <Login />;
  }

  if (type === OtpType.CheckOtp) {
    return <CheckOtp />;
  }

  if (type === OtpType.ConfirmContract) {
    return <ConfirmContract />;
  }

  if (type === OtpType.ConfirmTempCode) {
    return <ConfirmTempCode />;
  }

  if (type === OtpType.ConfirmCodeToChangePhoneNumber) {
    return <ConfirmCodeToChangePhoneNumber />;
  }

  if (type === OtpType.ConfirmCodeToChangePhoneNumberForUnauthorizedUser) {
    return <ConfirmCodeToChangePhoneNumberForUnauthorizedUser />;
  }

  if (type === OtpType.RegisterByFin) {
    return <RegisterByFin />;
  }

  return null;
};

export default Renderer;
