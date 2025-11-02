import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import {
  ICancelPromoCodeParams,
  ICheckPromoCodeAvailableResponse,
  ICreatePromoCodeParams,
} from "@/types/promoCode";

interface IPromoCodeService {
  checkPromoCodeAvailable(
    promoCode: string
  ): Promise<AxiosResponse<ICheckPromoCodeAvailableResponse>>;
  cancelPromoCode(moneyCodeId: string): Promise<AxiosResponse<void>>;
  createPromoCode(promoCode: string): Promise<AxiosResponse<void>>;
}

class PromoCodeService implements IPromoCodeService {
  constructor() {}

  checkPromoCodeAvailable(promoCode: string) {
    return $axios.post<void, AxiosResponse<ICheckPromoCodeAvailableResponse>>(
      `/client/isPromoCodeAvailable?code=${promoCode}`
    );
  }

  cancelPromoCode(moneyCodeId: string) {
    const params = new URLSearchParams([["moneyCodeId", moneyCodeId]]);
    return $axios.post<ICancelPromoCodeParams, AxiosResponse<void>>(
      "/client/cancelPromo",
      params
    );
  }

  createPromoCode(promoCode: string) {
    const params = new URLSearchParams([["promocode", promoCode]]);
    return $axios.post<ICreatePromoCodeParams, AxiosResponse<void>>(
      "/client/createPromoCode",
      params
    );
  }
}

export const promoCodeService = new PromoCodeService();
