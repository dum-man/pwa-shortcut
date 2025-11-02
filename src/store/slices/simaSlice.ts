import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { simaService } from "@/services/simaService";
import { IThunkError } from "@/types/app";
import { ISimaOperationStatus } from "@/types/sima";

export const generateSimaNavigationLink = createAsyncThunk<
  string,
  string,
  { rejectValue: IThunkError }
>("sima/generateNavigationLink", async (params, { rejectWithValue }) => {
  try {
    const response = await simaService.generateNavigationLink(params);

    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const generateSimaNavigationQr = createAsyncThunk<
  Blob,
  string,
  { rejectValue: IThunkError }
>("sima/generateNavigationLink", async (params, { rejectWithValue }) => {
  try {
    const response = await simaService.generateNavigationQr(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getSimaOperationStatus = createAsyncThunk<
  ISimaOperationStatus,
  string,
  { rejectValue: IThunkError }
>("sima/getOperationStatus", async (operationId, { rejectWithValue }) => {
  try {
    const response = await simaService.getOperationStatus(operationId);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {}

const initialState: IState = {};

export const simaSlice = createSlice({
  name: "sima",
  initialState,
  reducers: {
    resetSimaState: () => initialState,
  },
  extraReducers(builder) {},
});

export const { resetSimaState } = simaSlice.actions;

export default simaSlice.reducer;
