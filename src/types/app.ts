export interface IAppConfig {
  isSimaEnabled: boolean;
  processingPayType: "Azericard" | (string & {});
}

export interface IThunkError {
  errorText?: string;
  errorCode?: number;
  method?: string;
}

export interface IModal {
  isOpen: boolean;
}

export interface IDropdown extends IModal {}

export interface IPopover extends IModal {}

export interface IPopup extends IModal {}

export enum OtpType {
  Login = "LOGIN",
  CheckOtp = "CHECK_OTP",
  ConfirmContract = "CONFIRM_CONTRACT",
  ConfirmTempCode = "CONFIRM_TEMP_CODE",
  ConfirmCodeToChangePhoneNumber = "CONFIRM_CODE_TO_CHANGE_PHONE_NUMBER",
  ConfirmCodeToChangePhoneNumberForUnauthorizedUser = "CONFIRM_CODE_TO_CHANGE_PHONE_NUMBER_FOR_UNAUTHORIZED_USER",
  RegisterByFin = "REGISTER_BY_FIN",
}

export interface IOtpModal extends IModal {
  type?: OtpType;
  message?: string;
}

export interface IErrorModal extends IThunkError, IModal {}

export interface ICameraModal extends IModal {
  type?: "frontId" | "backId" | "selfie";
  onSuccess?: () => void;
}

export interface IContact {
  id: number;
  name: string;
}

export interface ITerminal {
  lat: string;
  lng: string;
  description: string;
  title: string;
}

export enum InfoType {
  ACCOUNT_DELETED = "accountDeleted",
  IN_APP_VIEW = "inAppView",
  CONSENT_FOR_SELFIE = "consentForSelfie",
  CONSENT_FOR_VIDEO_MESSAGE = "consentForVideoMessage",
  PASSWORD_SUCCESSFULLY_SET = "passwordSuccessfullySet",
  PHONE_NUMBER_SUCCESSFULLY_CHANGED = "phoneNumberSuccessfullyChanged",
}

export interface IInfoModal extends IModal {
  type?: InfoType;
  messageText?: string;
}

export interface ILoader extends IModal {
  type?: LoaderType;
}

export enum LoaderType {
  SMALL = "small",
  FULL = "full",
}

export interface IAuthToken {
  token: string;
  expires: number;
}

export interface INewPhoneNumberModal extends IModal {
  type?: "authorized" | "unauthorized";
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export enum LocalStorageKeys {
  AppLabelModalShow = "isAppLabelModalShown",
}
