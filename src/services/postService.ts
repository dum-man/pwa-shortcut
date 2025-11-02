import axios, { AxiosResponse } from "axios";

import $axios from "@/config/axios";
import {
  IGetPostParams,
  IGetPostsParams,
  IGetPostsResponse,
  IPost,
} from "@/types/post";

interface IPostService {
  getPosts(params: IGetPostsParams): Promise<AxiosResponse<IGetPostsResponse>>;
  getPost(params: IGetPostParams): Promise<AxiosResponse<IPost>>;
  getPostImage(id: string): Promise<AxiosResponse<string>>;
}

class PostService implements IPostService {
  baseURL = process.env.NEXT_PUBLIC_API_URL;

  constructor() {}

  getPosts({ page, limit, locale }: IGetPostsParams) {
    const params = new URLSearchParams([
      ["page", page],
      ["pageSize", limit],
    ]);
    return axios.get<IGetPostsParams, AxiosResponse<IGetPostsResponse>>(
      `${this.baseURL}api/news`,
      {
        headers: {
          lang: locale,
        },
        params,
      }
    );
  }

  getPost({ id, locale }: IGetPostParams) {
    return axios.get<IGetPostParams, AxiosResponse<IPost>>(
      `${this.baseURL}api/news/${id}`,
      {
        headers: {
          lang: locale,
        },
      }
    );
  }

  getPostImage(id: string) {
    return $axios.get<string, AxiosResponse<string>>(`/api/news/img/${id}`);
  }
}

export const postService = new PostService();
