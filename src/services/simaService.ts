import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { ISimaOperationStatus } from "@/types/sima";

interface ISimaService {
  generateNavigationLink(operationId: string): Promise<AxiosResponse<string>>;
  generateNavigationQr(operationId: string): Promise<AxiosResponse<Blob>>;
  getOperationStatus(
    operationId: string
  ): Promise<AxiosResponse<ISimaOperationStatus>>;
}

class SimaService implements ISimaService {
  constructor() {}

  generateNavigationLink(operationId: string) {
    return $axios.post<string, AxiosResponse<string>>(
      "/sima/generateNavigationLink",
      { operationId, responseType: "url" }
    );
  }

  generateNavigationQr(operationId: string) {
    return $axios.post<string, AxiosResponse<Blob>>(
      "/sima/generateNavigationLink",
      { operationId, responseType: "raw" },
      { responseType: "blob" }
    );
  }

  getOperationStatus(operationId: string) {
    const params = new URLSearchParams([["operationId", operationId]]);
    return $axios.get<string, AxiosResponse<ISimaOperationStatus>>(
      "/sima/getOperationStatus",
      { params }
    );
  }
}

export const simaService = new SimaService();
