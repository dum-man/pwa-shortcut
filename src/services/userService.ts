import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import {
  IAddGuarantorsParams,
  IAddProfileParams,
  IConfirmCodeToChangePhoneNumberParams,
  IConfirmCodeToChangePhoneNumberResponse,
  ICreatePasswordParams,
  ICreditHistory,
  IGetCodeToChangePhoneNumberParams,
  IGetCodeToChangePhoneNumberResponse,
  IGetFIOResponse,
  IProfileQuestion,
  ISaveAddressParams,
  IUser,
  IUserCreditRate,
  IUserState,
  IVerifyUserSelfieParams,
} from "@/types/user";

interface IUserService {
  getFIO(): Promise<AxiosResponse<IGetFIOResponse>>;
  getInfo(): Promise<AxiosResponse<IUser>>;
  getCreditHistory(): Promise<AxiosResponse<ICreditHistory[]>>;
  getState(): Promise<AxiosResponse<IUserState>>;
  getCreditRate(): Promise<AxiosResponse<IUserCreditRate>>;
  uploadSelfie(formData: FormData): Promise<AxiosResponse<void>>;
  uploadFrontSideDocument(formData: FormData): Promise<AxiosResponse<void>>;
  uploadBackSideDocument(formData: FormData): Promise<AxiosResponse<void>>;
  saveAddress(params: ISaveAddressParams): Promise<AxiosResponse<void>>;
  addGuarantors(params: IAddGuarantorsParams): Promise<AxiosResponse<void>>;
  checkUserNeedCompleteProfile(): Promise<AxiosResponse<boolean>>;
  addProfile(params: IAddProfileParams): Promise<AxiosResponse<void>>;
}

class UserService implements IUserService {
  constructor() {}

  getFIO() {
    return $axios.get<void, AxiosResponse<IGetFIOResponse>>("/client/getFIO");
  }

  getInfo() {
    return $axios.get<void, AxiosResponse<IUser>>("/client/getInfo");
  }

  getCreditHistory() {
    return $axios.get<void, AxiosResponse<ICreditHistory[]>>(
      "/client/getLoanHistory"
    );
  }

  getState() {
    return $axios.get<void, AxiosResponse<IUserState>>("/client/getState");
  }

  getCreditRate() {
    return $axios.get<void, AxiosResponse<IUserCreditRate>>("/client/getRate");
  }

  uploadSelfie(formData: FormData) {
    return $axios.post<FormData, AxiosResponse<void>>(
      "/client/uploadSelfie",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  uploadFrontSideDocument(formData: FormData) {
    return $axios.post<FormData, AxiosResponse<void>>(
      "/client/uploadFrontSide",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  uploadBackSideDocument(formData: FormData) {
    return $axios.post<FormData, AxiosResponse<void>>(
      "/client/uploadBackSide",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  saveAddress(params: ISaveAddressParams) {
    return $axios.post<ISaveAddressParams, AxiosResponse<void>>(
      "/client/saveAddress",
      params
    );
  }

  addGuarantors(params: IAddGuarantorsParams) {
    return $axios.post<IAddGuarantorsParams, AxiosResponse<void>>(
      "/client/saveGuarantors",
      params
    );
  }

  checkUserNeedCompleteProfile() {
    return $axios.get<void, AxiosResponse<boolean>>(
      "/clientProfile/needProfile"
    );
  }

  addProfile(params: IAddProfileParams) {
    return $axios.post<IAddProfileParams, AxiosResponse<void>>(
      "/clientProfile/saveProfile",
      params
    );
  }

  getProfileQuestions() {
    return $axios.get<void, AxiosResponse<IProfileQuestion[]>>(
      "/clientProfile/getProfileQuestions"
    );
  }

  getUserPhoto() {
    return $axios.get<void, AxiosResponse<Blob>>("/client/getIdentityPhoto", {
      responseType: "blob",
    });
  }

  createPassword(params: ICreatePasswordParams) {
    return $axios.post<ICreatePasswordParams, AxiosResponse<string>>(
      "/client/createPassword",
      params
    );
  }

  verifyUserSelfie({ selfiePhoto }: IVerifyUserSelfieParams) {
    const formData = new FormData();
    formData.append("selfiePhoto", selfiePhoto);
    return $axios.post<IVerifyUserSelfieParams, AxiosResponse<void>>(
      "/client/verifySelfie",
      formData
    );
  }

  getCodeToChangePhoneNumber({
    newPhoneNumber,
  }: IGetCodeToChangePhoneNumberParams) {
    const searchParams = new URLSearchParams([
      ["newPhoneNumber", newPhoneNumber],
    ]);
    return $axios.post<
      IGetCodeToChangePhoneNumberParams,
      AxiosResponse<IGetCodeToChangePhoneNumberResponse>
    >(`/client/changePhoneSendCode?${searchParams.toString()}`);
  }

  confirmCodeToChangePhoneNumber(
    params: IConfirmCodeToChangePhoneNumberParams
  ) {
    return $axios.post<
      IConfirmCodeToChangePhoneNumberParams,
      AxiosResponse<IConfirmCodeToChangePhoneNumberResponse>
    >("/client/changePhone", params);
  }
}

export const userService = new UserService();
