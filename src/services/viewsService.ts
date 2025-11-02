import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { IContractParams } from "@/types/views";

interface IViewsService {
  getCreditApplicationDoc(): Promise<AxiosResponse<string>>;
  getContractDoc(genCreditNumberId: string): Promise<AxiosResponse<Blob>>;
  getPreContractDoc(params: IContractParams): Promise<AxiosResponse<string>>;
  getContractIdToSign(params: IContractParams): Promise<AxiosResponse<string>>;
}

class ViewsService implements IViewsService {
  constructor() {}

  getCreditApplicationDoc() {
    return $axios.get<void, AxiosResponse<string>>(
      "/views/creditApplicationView"
    );
  }

  getContractDoc(genCreditNumberId: string) {
    const params = new URLSearchParams([
      ["genCreditNumberId", genCreditNumberId],
    ]);
    return $axios.get<string, AxiosResponse<Blob>>("/views/getContractPdf", {
      params,
      responseType: "blob",
      headers: { "Content-Type": "application/pdf" },
    });
  }

  getPreContractDoc(params: IContractParams) {
    return $axios.post<IContractParams, AxiosResponse<string>>(
      "/views/generateContractPreview",
      params
    );
  }

  getContractIdToSign(params: IContractParams) {
    return $axios.post<IContractParams, AxiosResponse<string>>(
      "/views/generateContractToSign",
      params
    );
  }
}

export const viewsService = new ViewsService();
