export interface ICheckPromoCodeAvailableParams {
  promoCode: string;
}

export interface ICheckPromoCodeAvailableResponse {
  discountValue: number;
  message: string;
  phone: null | string;
  statusCode: number;
}

export interface ICancelPromoCodeParams {
  moneyCodeId: string;
}

export interface ICreatePromoCodeParams {
  promoCode: string;
}
