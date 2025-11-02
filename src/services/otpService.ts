import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { IAuthToken } from "@/types/app";
import { ICheckOtpCodeParams } from "@/types/otp";

interface IOtpService {
  getOtpCode(phoneNumber: string): Promise<AxiosResponse<string>>;
  checkOtpCodeAndReturnTempToken(
    params: ICheckOtpCodeParams
  ): Promise<AxiosResponse<IAuthToken>>;
}

class OtpService implements IOtpService {
  constructor() {}

  getOtpCode(phoneNumber: string) {
    const params = new URLSearchParams([["phoneNumber", phoneNumber]]);
    return $axios.get<string, AxiosResponse<string>>("/auth/sendCode", {
      params,
    });
  }

  checkOtpCodeAndReturnTempToken(params: ICheckOtpCodeParams) {
    return $axios.post<ICheckOtpCodeParams, AxiosResponse<IAuthToken>>(
      "auth/checkCode",
      params
    );
  }
}

export const otpService = new OtpService();
