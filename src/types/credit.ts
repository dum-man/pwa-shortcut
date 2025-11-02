export enum ICreditType {
  CONSUMER = "ConsumerCredit",
  DAILY = "DailyCredit",
}

export interface IActiveCredit {
  getSum: number;
  startDate: string;
  dueDate: string;
  percent: number;
  currentSumToReturn: number;
  overpayment: number;
  status: string;
  genCreditNumberValue: string;
  genCreditNumberId: number;
  contractDays: number;
  type: ICreditType;
}

export interface IVerificationStatusResponse {
  days: number;
  sum: number;
  status: "Success" | "Pending" | "ServiceTemporaryNotAvailable" | "Rejected";
  verificationMessages: string;
  accessToken?: string;
  accessTokenLifeTimeInMinutes: number;
}

export interface IConfirmContractParams {
  operationId: string;
}

export interface IConfirmContractResponse {
  resultType: string;
  result: string;
}

export interface IConfirmContractBySmsResponse {
  resultType: string;
  result: string;
}

export interface IConfirmContractBySmsParams {
  days: number;
  sum: number;
  codeId: string;
  code: string;
  azMetricSource?: string;
}
