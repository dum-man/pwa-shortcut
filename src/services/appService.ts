import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { IAppConfig } from "@/types/app";

interface IAppService {
  getConfig(): Promise<AxiosResponse<IAppConfig>>;
}

class AppService implements IAppService {
  constructor() {}

  getConfig() {
    return $axios.get<void, AxiosResponse<IAppConfig>>(
      "/application/getConfig"
    );
  }
}

export const appService = new AppService();
