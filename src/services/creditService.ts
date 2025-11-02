import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import {
  IActiveCredit,
  IConfirmContractBySmsParams,
  IConfirmContractBySmsResponse,
  IConfirmContractParams,
  IConfirmContractResponse,
  IVerificationStatusResponse,
} from "@/types/credit";
import { getCookie } from "@/utils";

interface ICreditService {
  getActiveCredit(): Promise<AxiosResponse<IActiveCredit | void>>;
  initVerification(): Promise<AxiosResponse<void>>;
  getVerificationStatus(): Promise<AxiosResponse<IVerificationStatusResponse>>;
  getPaymentLink(): Promise<AxiosResponse<string>>;
  confirmContract(
    operationId: string
  ): Promise<AxiosResponse<IConfirmContractResponse>>;
  getSmsCodeToConfirmContract(): Promise<AxiosResponse<string>>;
  confirmContractBySms(
    params: IConfirmContractBySmsParams
  ): Promise<AxiosResponse<IConfirmContractBySmsResponse>>;
}

class CreditService implements ICreditService {
  constructor() {}

  getActiveCredit() {
    return $axios.get<void, AxiosResponse<IActiveCredit | void>>(
      "/credit/getActiveCredit"
    );
  }

  initVerification() {
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

    return $axios.post<void, AxiosResponse<void>>(
      `/credit/initVerification?${params.toString()}`
    );
  }

  getVerificationStatus() {
    const source = getCookie("source") ?? "";
    const clickId = getCookie("clickId") ?? "";
    const webId = getCookie("webId") ?? "";

    const params = new URLSearchParams([
      ["azMetricSource", source],
      ["clickId", clickId],
      ["webId", webId],
    ]);

    return $axios.get<void, AxiosResponse<IVerificationStatusResponse>>(
      `/credit/getVerificationStatus?${params.toString()}`
    );
  }

  getPaymentLink() {
    return $axios.get<void, AxiosResponse<string>>("/credit/getPaymentLink");
  }

  confirmContract(operationId: string) {
    const source = getCookie("source");
    const clickId = getCookie("clickId");
    const webId = getCookie("webId");

    const params = new URLSearchParams([["operationId", operationId]]);

    if (source) {
      params.append("azMetricSource", source);
    }

    if (clickId) {
      params.append("clickId", clickId);
    }

    if (webId) {
      params.append("webId", webId);
    }

    return $axios.post<
      IConfirmContractParams,
      AxiosResponse<IConfirmContractResponse>
    >(`/credit/confirmContract?${params.toString()}`);
  }

  getSmsCodeToConfirmContract() {
    return $axios.get<void, AxiosResponse<string>>(
      "/credit/sendConfirmContractCode"
    );
  }

  confirmContractBySms(params: IConfirmContractBySmsParams) {
    const source = getCookie("source");

    return $axios.post<
      IConfirmContractBySmsParams,
      AxiosResponse<IConfirmContractBySmsResponse>
    >("/credit/confirmContractBySms", {
      ...params,
      azMetricSource: source,
    });
  }
}

export const creditService = new CreditService();
