import { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import { IContact, ITerminal } from "@/types/app";

interface ICatalogService {
  getContactTypes(lang: string): Promise<AxiosResponse<IContact[]>>;
  getTerminalCoords(): Promise<AxiosResponse<ITerminal[]>>;
}

class CatalogService implements ICatalogService {
  constructor() {}

  getContactTypes(lang: string) {
    const params = new URLSearchParams([["lang", lang]]);
    return $axios.get<string, AxiosResponse<IContact[]>>(
      "/api/catalog/contactTypes",
      {
        params,
      }
    );
  }

  getTerminalCoords() {
    return $axios.get<string, AxiosResponse<ITerminal[]>>(
      "/api/catalog/getTermPositions"
    );
  }
}

export const catalogService = new CatalogService();
