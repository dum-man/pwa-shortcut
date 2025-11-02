import axios, { AxiosResponse } from "axios";

import { defaultLocale } from "@/i18n/config";
import {
  IAuthenticateAdminParams,
  IAuthenticateAdminResponse,
} from "@/types/admin";
import {
  ICreatePostParams,
  IEditPostParams,
  IFullPost,
  IUploadPostImageParams,
} from "@/types/post";
import { getCookie } from "@/utils";

interface IAdminService {
  auth(
    params: IAuthenticateAdminParams
  ): Promise<AxiosResponse<IAuthenticateAdminResponse>>;
  getFullPost(id: string): Promise<AxiosResponse<IFullPost>>;
  createPost(params: ICreatePostParams): Promise<AxiosResponse<void>>;
  editPost(post: IEditPostParams): Promise<AxiosResponse<void>>;
  deletePost(id: string): Promise<AxiosResponse<string>>;
  uploadPostImage(params: IUploadPostImageParams): Promise<AxiosResponse<void>>;
  deletePostImage(imageId: string): Promise<AxiosResponse<any>>;
}

class AdminService implements IAdminService {
  $axios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  constructor() {
    this.$axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${getCookie("adminToken")}`;
        config.headers.lang = getCookie("NEXT_LOCALE") ?? defaultLocale;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  auth(params: IAuthenticateAdminParams) {
    return this.$axios.post<
      IAuthenticateAdminParams,
      AxiosResponse<IAuthenticateAdminResponse>
    >("/api/user/auth", params);
  }

  getFullPost(id: string) {
    return this.$axios.get<string, AxiosResponse<IFullPost>>(
      `/api/news/full/${id}`
    );
  }

  createPost(params: ICreatePostParams) {
    return this.$axios.post<any, AxiosResponse<void>>("/api/news", params);
  }

  editPost(params: IEditPostParams) {
    return this.$axios.put<IEditPostParams, AxiosResponse<void>>(
      "/api/news",
      params
    );
  }

  deletePost(id: string) {
    return this.$axios.delete<string, AxiosResponse<string>>(`/api/news/${id}`);
  }

  uploadPostImage(params: IUploadPostImageParams) {
    return this.$axios.post<IUploadPostImageParams, AxiosResponse<void>>(
      "/api/news/upload-img",
      params
    );
  }

  deletePostImage(imageId: string) {
    return this.$axios.delete<string, AxiosResponse<any>>(
      `/api/news/img/${imageId}`
    );
  }
}

export const adminService = new AdminService();
