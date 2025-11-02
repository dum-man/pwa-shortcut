import { IAuthToken } from "./app";

export interface IGetFIOResponse {
  name: string;
  surName: string;
  middleName: string;
}

export interface IUser {
  name: string;
  surname: string;
  middleName: string;
  gender: 0 | 1;
  birthDate: string;
  phone: string;
  email: string;
  documentNumber: string;
  inn: string;
}

export interface ICreditHistory {
  creditId: number;
  contractId: string;
  createDate: string;
  lastOperationDate: string;
  status: string;
  sum: number;
  paySource: string;
  cardNumber: string;
}

export interface IUserState {
  hasSelfie: boolean;
  hasDocumentBackSide: boolean;
  hasDocumentFrontSide: boolean;
  hasGuarantors: boolean;
  hasActiveCredit: boolean;
  hasVerifiedRequest: boolean;
  isSimaEnabled: boolean;
  isVideoAttached: boolean;
  needClientProfile: boolean;
  isNewClient: boolean;
  operation: {
    operationId: string;
    status:
      | "Created"
      | "Pending"
      | "Signed"
      | "Confirmed"
      | "Received"
      | "Failed";
    expireAt: string;
  } | null;
  hasPassword: boolean;
}

export interface IUserCreditRate {
  sumMin: number;
  sumMax: number;
  sumDefault: number;
  daysMin: number;
  daysMax: number;
  daysDefault: number;
  percentNormal: number;
  sumIncrementValue: number;
}

export type IUserCreditRatePromo = Pick<
  IUserCreditRate,
  "sumMin" | "sumMax" | "sumIncrementValue" | "sumDefault" | "daysDefault"
>;

export interface ISaveAddressParams {
  city: string;
  street: string;
  house: string;
  apartments: string;
}

export interface IAddGuarantorsParams {
  email: string;
  guarantors: IGuarantor[];
}

export interface IGuarantor {
  name: string;
  phoneNumber: string;
  contactTypeId: number;
}

export interface IAddProfileParams {
  wasFullnameChanged: boolean;
  changedName: string;
  currentAddress: string;
  email: string;
  workplaceAndPosition: string;
  incomeSum: number;
  otherIncomeSources: string;
  otherIncomeSourcesSum: number;
  hasInternationalTransfers: boolean;
  transfersInformation: string | null;
  transfersAmount: number;
  isPolitician: boolean;
  politicallyExposedCategoryId: number | null;
  platformsAndRegions: string;
  purposeOfEstablishingBusinessRelationshipId: number | null;
  hasCriminalRecord: boolean;
  criminalArticleId: number | null;
}

export enum ProfileQuestionType {
  PoliticallyExposedPerson = "PoliticallyExposedPerson",
  PurposeOfEstablishingBusinessRelationship = "PurposeOfEstablishingBusinessRelationship",
  CriminalArticle = "CriminalArticle",
}

export interface IProfileQuestion {
  id: number;
  type: ProfileQuestionType;
  question: string;
  answers: {
    id: 0;
    answerOption: string;
  }[];
}

export interface ICreatePasswordParams {
  password: string;
  confirmPassword: string;
}

export interface IVerifyUserSelfieParams {
  selfiePhoto: File;
}

export interface IGetCodeToChangePhoneNumberParams {
  newPhoneNumber: string;
}

export interface IGetCodeToChangePhoneNumberResponse {
  idempotencyKey: string;
  message: string;
}

export interface IConfirmCodeToChangePhoneNumberParams {
  idempotencyKey: string;
  newPhoneNumber: string;
  smsCode: string;
}

export interface IConfirmCodeToChangePhoneNumberResponse extends IAuthToken {}
