"use client";

import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { otpService } from "@/services/otpService";
import { IAuthToken, IThunkError } from "@/types/app";
import { ICheckOtpCodeParams, IGetOtpCodeParams } from "@/types/otp";

import { RootState } from "../store";
import { authTokenHandler } from "@/utils/handlers";

export const getOtpCode = createAsyncThunk<
  string,
  IGetOtpCodeParams,
  { rejectValue: IThunkError }
>("otp/getSmsCode", async ({ phoneNumber }, { rejectWithValue }) => {
  try {
    const response = await otpService.getOtpCode(phoneNumber);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const checkOtpCodeAndReturnTempToken = createAsyncThunk<
  IAuthToken,
  Pick<ICheckOtpCodeParams, "code">,
  { rejectValue: IThunkError }
>(
  "otp/checkOtpCodeAndReturnToken",
  async ({ code }, { rejectWithValue, getState }) => {
    const {
      otp: { codeId },
    } = getState() as RootState;
    try {
      const response = await otpService.checkOtpCodeAndReturnTempToken({
        code,
        codeId,
      });
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

interface IState {
  codeId: string;
  phoneNumber: string;
}

const initialState: IState = {
  codeId: "",
  phoneNumber: "",
};

export const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    resetOtpState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(
        checkOtpCodeAndReturnTempToken.fulfilled,
        (_, { payload }: PayloadAction<IAuthToken>) => {
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        getOtpCode.fulfilled,
        (state, { payload: codeId }: PayloadAction<string>) => {
          state.codeId = codeId;
        }
      );
  },
});

export const { setPhoneNumber, resetOtpState } = otpSlice.actions;

export default otpSlice.reducer;
