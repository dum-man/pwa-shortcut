export type IBeneficiaryQuestionType =
  | "Text"
  | "TextWithHint"
  | "YesNo"
  | "YesNoWithInput"
  | "Numeric"
  | "AlphaNumeric"
  | "Alphabetic"
  | "Email"
  | "DatePicker"
  | "PhoneNumber"
  | "CardNumber"
  | "CardExpirationDate";

export interface IBeneficiaryQuestion {
  questionId: number;
  isRequired: boolean;
  orderNumber: number;
  text: string;
  type: IBeneficiaryQuestionType;
  hint: string | null;
  inputPlaceholder: string | null;
  minLength: number | null;
  maxLength: number | null;
}

export interface IBeneficiaryQuestionnaireResponse {
  clientId: number;
  creditId: 0;
  questions: IBeneficiaryQuestion[];
}

export interface IBeneficiaryResponse {
  questionId: number;
  question: string;
  response: string;
}

export interface IBeneficiaryResponseParams {
  clientId: number;
  creditId: number;
  isSelfBeneficiar: boolean;
  responses?: IBeneficiaryResponse[];
}
