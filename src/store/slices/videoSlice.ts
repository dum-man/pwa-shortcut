import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { videoService } from "@/services/videoService";
import { IThunkError } from "@/types/app";

export const checkVideoUploaded = createAsyncThunk<
  boolean,
  void,
  { rejectValue: IThunkError }
>("video/checkVideoUploaded", async (_, { rejectWithValue }) => {
  try {
    const response = await videoService.checkVideoUploaded();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getVideoInstructions = createAsyncThunk<
  string,
  void,
  { rejectValue: IThunkError }
>("video/getVideoInstructions", async (_, { rejectWithValue }) => {
  try {
    const response = await videoService.getVideoInstructions();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {}

const initialState: IState = {};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    resetVideoState: () => initialState,
  },
  extraReducers(builder) {},
});

export const { resetVideoState } = videoSlice.actions;

export default videoSlice.reducer;
