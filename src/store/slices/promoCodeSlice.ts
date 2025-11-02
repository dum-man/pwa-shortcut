import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { promoCodeService } from "@/services/promoCodeService";
import { IThunkError } from "@/types/app";
import {
  ICancelPromoCodeParams,
  ICheckPromoCodeAvailableParams,
  ICheckPromoCodeAvailableResponse,
  ICreatePromoCodeParams,
} from "@/types/promoCode";

export const checkPromoCodeAvailable = createAsyncThunk<
  ICheckPromoCodeAvailableResponse,
  ICheckPromoCodeAvailableParams,
  { rejectValue: IThunkError }
>(
  "promoCode/checkPromoCodeAvailable",
  async ({ promoCode }, { rejectWithValue }) => {
    try {
      const response = await promoCodeService.checkPromoCodeAvailable(
        promoCode
      );
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const cancelPromoCode = createAsyncThunk<
  void,
  ICancelPromoCodeParams,
  { rejectValue: IThunkError }
>("promoCode/cancelPromoCode", async ({ moneyCodeId }, { rejectWithValue }) => {
  try {
    const response = await promoCodeService.cancelPromoCode(moneyCodeId);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const createPromoCode = createAsyncThunk<
  void,
  ICreatePromoCodeParams,
  { rejectValue: IThunkError }
>("promoCode/createPromoCode", async ({ promoCode }, { rejectWithValue }) => {
  try {
    const response = await promoCodeService.createPromoCode(promoCode);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {}

const initialState: IState = {};

export const promoCodeSlice = createSlice({
  name: "promoCode",
  initialState,
  reducers: {
    resetPromoCodeState: () => initialState,
  },
  extraReducers(builder) {},
});

export const { resetPromoCodeState } = promoCodeSlice.actions;

export default promoCodeSlice.reducer;
