import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { creditService } from "@/services/creditService";
import { IThunkError } from "@/types/app";
import {
  IActiveCredit,
  IConfirmContractBySmsParams,
  IConfirmContractBySmsResponse,
  IConfirmContractParams,
  IConfirmContractResponse,
  IVerificationStatusResponse,
} from "@/types/credit";
import { operationIdHandler } from "@/utils/handlers";

export const getActiveCredit = createAsyncThunk<
  IActiveCredit | void,
  void,
  { rejectValue: IThunkError }
>("credit/getActiveCredit", async (_, { rejectWithValue }) => {
  try {
    const response = await creditService.getActiveCredit();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const initCreditVerification = createAsyncThunk<
  void,
  void,
  { rejectValue: IThunkError }
>("credit/initCreditVerification", async (_, { rejectWithValue }) => {
  try {
    const response = await creditService.initVerification();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getCreditVerificationStatus = createAsyncThunk<
  IVerificationStatusResponse,
  void,
  { rejectValue: IThunkError }
>("credit/getCreditVerificationStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await creditService.getVerificationStatus();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getCreditPaymentLink = createAsyncThunk<
  string,
  void,
  { rejectValue: IThunkError }
>("credit/getCreditPaymentLink", async (_, { rejectWithValue }) => {
  try {
    const response = await creditService.getPaymentLink();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const confirmCreditContract = createAsyncThunk<
  IConfirmContractResponse,
  IConfirmContractParams,
  { rejectValue: IThunkError }
>(
  "credit/confirmCreditContract",
  async ({ operationId }, { rejectWithValue }) => {
    try {
      const response = await creditService.confirmContract(operationId);
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const getSmsCodeToConfirmCreditContract = createAsyncThunk<
  string,
  void,
  { rejectValue: IThunkError }
>(
  "credit/getSmsCodeToConfirmCreditContract",
  async (_, { rejectWithValue }) => {
    try {
      const response = await creditService.getSmsCodeToConfirmContract();
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const confirmCreditContractBySms = createAsyncThunk<
  IConfirmContractBySmsResponse,
  IConfirmContractBySmsParams,
  { rejectValue: IThunkError }
>("credit/confirmCreditContractBySms", async (params, { rejectWithValue }) => {
  try {
    const response = await creditService.confirmContractBySms(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface ICreditToReceive {
  days: number;
  sum: number;
}

const creditToReceiveInitialState: ICreditToReceive = {
  days: 0,
  sum: 0,
};

interface IState {
  activeCredit: IActiveCredit | null;
  creditToReceive: ICreditToReceive;
  codeId: string;
}

const initialState: IState = {
  activeCredit: null,
  creditToReceive: creditToReceiveInitialState,
  codeId: "",
};

export const creditSlice = createSlice({
  name: "credit",
  initialState,
  reducers: {
    setCreditToReceiveData: (
      state,
      { payload }: PayloadAction<Partial<ICreditToReceive>>
    ) => {
      state.creditToReceive = Object.assign(state.creditToReceive, payload);
    },
    resetCreditState: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(
        getActiveCredit.fulfilled,
        (
          state,
          { payload: activeCredit }: PayloadAction<IActiveCredit | void>
        ) => {
          state.activeCredit = activeCredit ?? null;
        }
      )
      .addCase(confirmCreditContract.fulfilled, () => {
        operationIdHandler.remove();
      })
      .addCase(
        getSmsCodeToConfirmCreditContract.fulfilled,
        (state, { payload }) => {
          state.codeId = payload;
        }
      );
  },
});

export const { setCreditToReceiveData, resetCreditState } = creditSlice.actions;

export default creditSlice.reducer;
