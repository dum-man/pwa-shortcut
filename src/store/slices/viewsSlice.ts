import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { viewsService } from "@/services/viewsService";
import { IThunkError } from "@/types/app";
import { IContractParams } from "@/types/views";
import { operationIdHandler } from "@/utils/handlers";

export const getCreditApplicationDoc = createAsyncThunk<
  string,
  void,
  { rejectValue: IThunkError }
>("views/getCreditApplicationDoc", async (_, { rejectWithValue }) => {
  try {
    const response = await viewsService.getCreditApplicationDoc();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getContractDoc = createAsyncThunk<
  Blob,
  string,
  { rejectValue: IThunkError }
>("views/getContractDoc", async (genCreditNumberId, { rejectWithValue }) => {
  try {
    const response = await viewsService.getContractDoc(genCreditNumberId);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getPreContractDoc = createAsyncThunk<
  string,
  IContractParams,
  { rejectValue: IThunkError }
>("views/getPreContractDoc", async (params, { rejectWithValue }) => {
  try {
    const response = await viewsService.getPreContractDoc(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getContractIdToSign = createAsyncThunk<
  string,
  IContractParams,
  { rejectValue: IThunkError }
>("views/getContractIdToSign", async (params, { rejectWithValue }) => {
  try {
    const response = await viewsService.getContractIdToSign(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {}

const initialState: IState = {};

export const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    resetViewsState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(
      // contractId === operationId
      getContractIdToSign.fulfilled,
      (_, { payload: operationId }) => {
        operationIdHandler.set(operationId);
      }
    );
  },
});

export const { resetViewsState } = viewsSlice.actions;

export default viewsSlice.reducer;
