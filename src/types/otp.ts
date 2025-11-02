export interface IGetOtpCodeParams {
  phoneNumber: string;
}

export interface ICheckOtpCodeParams {
  code: string;
  codeId: string;
}
