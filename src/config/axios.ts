import axios, { AxiosError } from "axios";

import { defaultLocale } from "@/i18n/config";
import { getCookie, getErrorText } from "@/utils";
import { authTokenHandler, handleResetStores } from "@/utils/handlers";

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${authTokenHandler.get()}`;
    config.headers.lang = getCookie("NEXT_LOCALE") ?? defaultLocale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<any> => {
    // 406 - произошла ошибка при проверке токена, не валидный токен
    if (error.response?.status === 401 || error.response?.status === 406) {
      handleResetStores();
      // если по какой то причине текущий токен стал невалидным
      if (authTokenHandler.get()) {
        authTokenHandler.remove();
      }
    }
    return Promise.reject({
      errorText: getErrorText(error),
      errorCode: error.response?.status,
      method: error.config?.url,
    });
  }
);

export default $axios;
