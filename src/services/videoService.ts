import { AxiosResponse } from "axios";

import $axios from "@/config/axios";

interface IVideoService {
  checkVideoUploaded(): Promise<AxiosResponse<boolean>>;
  getVideoInstructions(): Promise<AxiosResponse<string>>;
}

class VideoService implements IVideoService {
  constructor() {}

  checkVideoUploaded() {
    return $axios.get<void, AxiosResponse<boolean>>("/video/checkState");
  }

  getVideoInstructions() {
    return $axios.get<void, AxiosResponse<string>>("/video/instruction");
  }
}

export const videoService = new VideoService();
