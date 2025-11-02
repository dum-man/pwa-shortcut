import { IAuthToken } from "./app";

export interface ICheckUserExistsParams {
  phoneNumber: string;
}

export interface IAuthenticateBySmsCodeParams {
  code: string;
  codeId: string;
}

export interface IPreRegisterParams {
  fin: string;
  birthday: string;
}

export interface ICheckUserExistsByFinParams {
  fin: string;
}

export interface ICheckUserExistsByFinResponse {
  idempotencyKey: string;
  message: string;
}

export interface ILoginByFinParams {
  idempotencyKey: string;
  password: string;
}

export interface ILoginByFinResponse extends IAuthToken {}

export interface ISendTempPasswordParams {
  idempotencyKey: string;
}

export interface ISendTempPasswordResponse {
  idempotencyKey: string;
  message: string;
}

export interface IConfirmTempPasswordParams {
  tempPassword: string;
  idempotencyKey: string;
}

export interface IConfirmTempPasswordResponse extends IAuthToken {}

export interface IRegisterByFinParams {
  fin: string;
  phoneNumber: string;
  birthDate: string;
  code: string;
}

export interface IRegisterByFinResponse extends IAuthToken {}

export interface IVerifyUnauthorizedUserSelfieParams {
  idempotencyKey: string;
  selfiePhoto: File;
}

export interface ISendRegisterCodeParams {
  phoneNumber: string;
}

export interface IGetCodeToChangePhoneNumberForUnauthorizedUserParams {
  idempotencyKey: string;
  newPhoneNumber: string;
}

export interface IGetCodeToChangePhoneNumberForUnauthorizedUserResponse {
  idempotencyKey: string;
  message: string;
}

export interface IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams {
  idempotencyKey: string;
  newPhoneNumber: string;
  smsCode: string;
}

export interface IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse
  extends IAuthToken {}
