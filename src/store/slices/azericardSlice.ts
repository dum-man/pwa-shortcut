import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { azericardService } from "@/services/azericardService";
import { IThunkError } from "@/types/app";

export const getAzericardPaymentUrl = createAsyncThunk<
  string,
  void,
  { rejectValue: IThunkError }
>("azericard/getPaymentUrl", async (_, { rejectWithValue }) => {
  try {
    const response = await azericardService.getPaymentUrl();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const checkAzericardPaymentCompleted = createAsyncThunk<
  boolean,
  void,
  { rejectValue: IThunkError }
>("azericard/checkPaymentCompleted", async (_, { rejectWithValue }) => {
  try {
    const response = await azericardService.checkPaymentCompleted();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {}

const initialState: IState = {};

export const azericardSlice = createSlice({
  name: "azericard",
  initialState,
  reducers: {
    resetAzericardState: () => initialState,
  },
  extraReducers(builder) {},
});

export const { resetAzericardState } = azericardSlice.actions;

export default azericardSlice.reducer;
