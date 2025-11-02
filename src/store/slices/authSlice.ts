import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authService } from "@/services/authService";
import { IAuthToken, IThunkError } from "@/types/app";
import {
  ICheckUserExistsByFinParams,
  ICheckUserExistsByFinResponse,
  ICheckUserExistsParams,
  IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams,
  IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse,
  IConfirmTempPasswordParams,
  IConfirmTempPasswordResponse,
  IGetCodeToChangePhoneNumberForUnauthorizedUserParams,
  IGetCodeToChangePhoneNumberForUnauthorizedUserResponse,
  ILoginByFinParams,
  ILoginByFinResponse,
  IPreRegisterParams,
  IRegisterByFinParams,
  IRegisterByFinResponse,
  ISendRegisterCodeParams,
  ISendTempPasswordParams,
  ISendTempPasswordResponse,
  IVerifyUnauthorizedUserSelfieParams,
} from "@/types/auth";
import { authTokenHandler } from "@/utils/handlers";

import { RootState } from "../store";

export const checkUserExists = createAsyncThunk<
  boolean,
  ICheckUserExistsParams,
  { rejectValue: IThunkError }
>("auth/checkUserExists", async ({ phoneNumber }, { rejectWithValue }) => {
  try {
    const response = await authService.checkUserExists(phoneNumber);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const authenticateBySmsCode = createAsyncThunk<
  IAuthToken,
  string,
  { rejectValue: IThunkError }
>(
  "auth/authenticateBySmsCode",
  async (otpCode, { rejectWithValue, getState }) => {
    const {
      otp: { codeId },
    } = getState() as RootState;
    try {
      const response = await authService.authenticateBySmsCode({
        code: otpCode,
        codeId,
      });
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const preRegister = createAsyncThunk<
  IAuthToken,
  IPreRegisterParams,
  { rejectValue: IThunkError }
>("auth/preRegister", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.preRegister(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const checkUserExistsByFin = createAsyncThunk<
  ICheckUserExistsByFinResponse,
  ICheckUserExistsByFinParams,
  { rejectValue: IThunkError }
>("auth/checkUserExistsByFin", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.checkUserExistsByFin(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const loginByFin = createAsyncThunk<
  ILoginByFinResponse,
  ILoginByFinParams,
  { rejectValue: IThunkError }
>("auth/loginByFin", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.loginByFin(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const sendTempPassword = createAsyncThunk<
  ISendTempPasswordResponse,
  ISendTempPasswordParams,
  { rejectValue: IThunkError }
>("auth/sendTempPassword", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.sendTempPassword(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const confirmTempPassword = createAsyncThunk<
  IConfirmTempPasswordResponse,
  IConfirmTempPasswordParams,
  { rejectValue: IThunkError }
>("auth/confirmTempPassword", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.confirmTempPassword(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const sendRegisterCode = createAsyncThunk<
  string,
  ISendRegisterCodeParams,
  { rejectValue: IThunkError }
>("auth/sendRegisterCode", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.sendRegisterCode(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const registerByFin = createAsyncThunk<
  IRegisterByFinResponse,
  IRegisterByFinParams,
  { rejectValue: IThunkError }
>("auth/registerByFin", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.registerByFin(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const verifyUnauthorizedUserSelfie = createAsyncThunk<
  string,
  IVerifyUnauthorizedUserSelfieParams,
  { rejectValue: IThunkError }
>("auth/verifyUnauthorizedUserSelfie", async (params, { rejectWithValue }) => {
  try {
    const response = await authService.verifyUnauthorizedUserSelfie(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getCodeToChangePhoneNumberForUnauthorizedUser = createAsyncThunk<
  IGetCodeToChangePhoneNumberForUnauthorizedUserResponse,
  IGetCodeToChangePhoneNumberForUnauthorizedUserParams,
  { rejectValue: IThunkError }
>(
  "auth/getCodeToChangePhoneNumberForUnauthorizedUser",
  async (params, { rejectWithValue }) => {
    try {
      const response =
        await authService.getCodeToChangePhoneNumberForUnauthorizedUser(params);
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

export const confirmCodeToChangePhoneNumberForUnauthorizedUser =
  createAsyncThunk<
    IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse,
    IConfirmCodeToChangePhoneNumberForUnauthorizedUserParams,
    { rejectValue: IThunkError }
  >(
    "auth/confirmCodeToChangePhoneNumberForUnauthorizedUser",
    async (params, { rejectWithValue }) => {
      try {
        const response =
          await authService.confirmCodeToChangePhoneNumberForUnauthorizedUser(
            params
          );
        return response.data;
      } catch (error: any) {
        throw rejectWithValue(error);
      }
    }
  );

interface IState {
  isAuth: boolean;
  frontId: string | null;
  backId: string | null;
  fin: string;
  phoneNumber: string;
  birthDate: string;
  idempotencyKey: string;
  serverMessage: string;
}

const initialState: IState = {
  isAuth: false,
  frontId: null,
  backId: null,
  fin: "",
  phoneNumber: "",
  birthDate: "",
  idempotencyKey: "",
  serverMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, { payload: isAuth }: PayloadAction<boolean>) => {
      state.isAuth = isAuth;
    },
    setFrontId: (state, { payload: frontId }: PayloadAction<string | null>) => {
      state.frontId = frontId;
    },
    setBackId: (state, { payload: backId }: PayloadAction<string | null>) => {
      state.backId = backId;
    },
    resetAuthState: () => initialState,
    setFinToStore: (state, { payload }: PayloadAction<string>) => {
      state.fin = payload;
    },
    setPhoneNumberToAuthStore: (state, { payload }: PayloadAction<string>) => {
      state.phoneNumber = payload;
    },
    setBirthDateToStore: (state, { payload }: PayloadAction<string>) => {
      state.birthDate = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        authenticateBySmsCode.fulfilled,
        (state, { payload }: PayloadAction<IAuthToken>) => {
          state.isAuth = true;
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        preRegister.fulfilled,
        (state, { payload }: PayloadAction<IAuthToken>) => {
          state.isAuth = true;
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        checkUserExistsByFin.fulfilled,
        (state, { payload }: PayloadAction<ICheckUserExistsByFinResponse>) => {
          state.idempotencyKey = payload.idempotencyKey;
          state.serverMessage = payload.message;
        }
      )
      .addCase(
        sendTempPassword.fulfilled,
        (state, { payload }: PayloadAction<ISendTempPasswordResponse>) => {
          state.idempotencyKey = payload.idempotencyKey;
        }
      )
      .addCase(
        confirmTempPassword.fulfilled,
        (_, { payload }: PayloadAction<IConfirmTempPasswordResponse>) => {
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        loginByFin.fulfilled,
        (state, { payload }: PayloadAction<ILoginByFinResponse>) => {
          state.isAuth = true;
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        registerByFin.fulfilled,
        (state, { payload }: PayloadAction<IRegisterByFinResponse>) => {
          state.isAuth = true;
          authTokenHandler.set(payload.token, payload.expires);
        }
      )
      .addCase(
        verifyUnauthorizedUserSelfie.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          state.idempotencyKey = payload;
        }
      )
      .addCase(
        getCodeToChangePhoneNumberForUnauthorizedUser.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<IGetCodeToChangePhoneNumberForUnauthorizedUserResponse>
        ) => {
          state.idempotencyKey = payload.idempotencyKey;
        }
      )
      .addCase(
        confirmCodeToChangePhoneNumberForUnauthorizedUser.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<IConfirmCodeToChangePhoneNumberForUnauthorizedUserResponse>
        ) => {
          state.isAuth = true;
          authTokenHandler.set(payload.token, payload.expires);
        }
      );
  },
});

export const {
  setIsAuth,
  setFrontId,
  setBackId,
  resetAuthState,
  setFinToStore,
  setPhoneNumberToAuthStore,
  setBirthDateToStore,
} = authSlice.actions;

export default authSlice.reducer;
