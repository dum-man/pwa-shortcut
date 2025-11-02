export interface IGetPostsParams {
  page: string;
  limit: string;
  locale: string;
}

export interface IGetPostsResponse {
  items: IPost[];
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IGetPostParams {
  id: string;
  locale: string;
}

export interface IPostImage {
  id: string;
  fileName: string;
}

export interface IPost {
  id: string;
  title: string;
  content: string;
  createdTime: string;
  publishDate: string;
  coverImg: string;
  images: IPostImage[];
}

export interface IFullPost {
  id: string;
  titleAz: string;
  titleRu: string;
  contentAz: string;
  contentRu: string;
  coverImgAz: string;
  coverImgRu: string;
  createdTime: string;
  publishDate: string;
  images: IPostImage[];
}

export type ICreatePostParams = {
  titleAz: string;
  titleRu: string;
  contentAz: string;
  contentRu: string;
  coverImgAz: string;
  coverImgRu: string;
  publishDate: string;
};

export type IEditPostParams = {
  id: string;
  titleAz: string;
  titleRu: string;
  contentAz: string;
  contentRu: string;
  coverImgAz?: string;
  coverImgRu?: string;
  publishDate: string;
};

export interface IUploadPostImageParams {
  postId: string;
  data: string;
  fileName: string;
}

export interface IUploadPostImage {
  data: string;
  fileName: string;
}
