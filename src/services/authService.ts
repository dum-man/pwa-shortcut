import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { IAuthToken } from "@/types/app";
import {
  IAuthenticateBySmsCodeParams,
  ICheckUserExistsByFinParams,
  ICheckUserExistsByFinResponse,
  IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams,
  IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse,
  IConfirmTempPasswordParams,
  IConfirmTempPasswordResponse,
  IGetCodeToChangePhoneNumberForUnauthorizedUserParams,
  IGetCodeToChangePhoneNumberForUnauthorizedUserResponse,
  ILoginByFinParams,
  ILoginByFinResponse,
  IPreRegisterParams,
  IRegisterByFinParams,
  IRegisterByFinResponse,
  ISendRegisterCodeParams,
  ISendTempPasswordParams,
  ISendTempPasswordResponse,
  IVerifyUnauthorizedUserSelfieParams,
} from "@/types/auth";
import { getCookie } from "@/utils";

interface IAuthService {
  checkUserExists(phoneNumber: string): Promise<AxiosResponse<boolean>>;
  authenticateBySmsCode(
    params: IAuthenticateBySmsCodeParams
  ): Promise<AxiosResponse<IAuthToken>>;
  preRegister(params: IPreRegisterParams): Promise<AxiosResponse<IAuthToken>>;
}

class AuthService implements IAuthService {
  constructor() {}

  checkUserExists(phoneNumber: string) {
    const params = new URLSearchParams([["phoneNumber", phoneNumber]]);
    return $axios.get<string, AxiosResponse<boolean>>("/auth/checkClient", {
      params,
    });
  }

  authenticateBySmsCode(params: IAuthenticateBySmsCodeParams) {
    return $axios.post<IAuthenticateBySmsCodeParams, AxiosResponse<IAuthToken>>(
      "/auth/loginWithCode",
      params
    );
  }

  preRegister({ fin, birthday }: IPreRegisterParams) {
    const formData = new FormData();

    formData.append("fin", fin);
    formData.append("birthday", birthday);

    const source = getCookie("source");
    const clickId = getCookie("clickId");
    const webId = getCookie("webId");

    if (source) {
      formData.append("azMetricSource", source);
    }

    if (clickId) {
      formData.append("clickId", clickId);
    }

    if (webId) {
      formData.append("webId", webId);
    }

    return $axios.post<IPreRegisterParams, AxiosResponse<IAuthToken>>(
      "/auth/preregister",
      formData
    );
  }

  checkUserExistsByFin(params: ICheckUserExistsByFinParams) {
    return $axios.post<
      ICheckUserExistsByFinParams,
      AxiosResponse<ICheckUserExistsByFinResponse>
    >("/auth/isClientExist", params);
  }

  loginByFin(params: ILoginByFinParams) {
    return $axios.post<ILoginByFinParams, AxiosResponse<ILoginByFinResponse>>(
      "/auth/login",
      params
    );
  }

  sendTempPassword({ idempotencyKey }: ISendTempPasswordParams) {
    const params = new URLSearchParams([["idempotencyKey", idempotencyKey]]);
    return $axios.post<
      ISendTempPasswordParams,
      AxiosResponse<ISendTempPasswordResponse>
    >(`/auth/sendTempPassword?${params.toString()}`);
  }

  confirmTempPassword(params: IConfirmTempPasswordParams) {
    return $axios.post<
      IConfirmTempPasswordParams,
      AxiosResponse<IConfirmTempPasswordResponse>
    >("/auth/confirmTempPass", params);
  }

  sendRegisterCode(params: ISendRegisterCodeParams) {
    return $axios.post<ISendRegisterCodeParams, AxiosResponse<string>>(
      "/auth/sendRegisterCode",
      params
    );
  }

  registerByFin(params: IRegisterByFinParams) {
    return $axios.post<
      IRegisterByFinParams,
      AxiosResponse<IRegisterByFinResponse>
    >("/auth/register", params);
  }

  verifyUnauthorizedUserSelfie({
    idempotencyKey,
    selfiePhoto,
  }: IVerifyUnauthorizedUserSelfieParams) {
    const formData = new FormData();
    formData.append("selfiePhoto", selfiePhoto);
    return $axios.post<
      Pick<IVerifyUnauthorizedUserSelfieParams, "selfiePhoto">,
      AxiosResponse<string>
    >(`/auth/verifyGuestSelfie/${idempotencyKey}`, formData);
  }

  getCodeToChangePhoneNumberForUnauthorizedUser(
    params: IGetCodeToChangePhoneNumberForUnauthorizedUserParams
  ) {
    return $axios.post<
      IGetCodeToChangePhoneNumberForUnauthorizedUserParams,
      AxiosResponse<IGetCodeToChangePhoneNumberForUnauthorizedUserResponse>
    >("/auth/guestChangePhoneSendCode", params);
  }

  confirmCodeToChangePhoneNumberForUnauthorizedUser(
    params: IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams
  ) {
    return $axios.post<
      IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams,
      AxiosResponse<IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse>
    >("/auth/guestChangePhone", params);
  }
}

export const authService = new AuthService();
