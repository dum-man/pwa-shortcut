import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { getCookie } from "@/utils";

interface IAzericardService {
  getPaymentUrl(): Promise<AxiosResponse<string>>;
  checkPaymentCompleted(): Promise<AxiosResponse<boolean>>;
}

class AzericardService implements IAzericardService {
  constructor() {}

  getPaymentUrl(): Promise<AxiosResponse<string>> {
    const source = getCookie("source");
    const clickId = getCookie("clickId");
    const webId = getCookie("webId");

    const params = new URLSearchParams();

    if (source) {
      params.append("azMetricSource", source);
    }

    if (clickId) {
      params.append("clickId", clickId);
    }

    if (webId) {
      params.append("webId", webId);
    }

    return $axios.post<void, AxiosResponse<string>>(
      `/azericard/getPaymentUrl?${params.toString()}`
    );
  }

  checkPaymentCompleted() {
    return $axios.get<void, AxiosResponse<boolean>>(
      "/azericard/isPaymentNotCompleted"
    );
  }
}

export const azericardService = new AzericardService();
