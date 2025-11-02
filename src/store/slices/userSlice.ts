import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userService } from "@/services/userService";
import { IThunkError } from "@/types/app";
import {
  IAddGuarantorsParams,
  IAddProfileParams,
  IConfirmCodeToChangePhoneNumberParams,
  IConfirmCodeToChangePhoneNumberResponse,
  ICreatePasswordParams,
  ICreditHistory,
  IGetCodeToChangePhoneNumberParams,
  IGetCodeToChangePhoneNumberResponse,
  IGetFIOResponse,
  IProfileQuestion,
  ISaveAddressParams,
  IUser,
  IUserCreditRate,
  IUserState,
  IVerifyUserSelfieParams,
} from "@/types/user";
import { authTokenHandler } from "@/utils/handlers";

export const getUserFIO = createAsyncThunk<
  IGetFIOResponse,
  void,
  { rejectValue: IThunkError }
>("user/getFIO", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getFIO();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getUserInfo = createAsyncThunk<
  IUser,
  void,
  { rejectValue: IThunkError }
>("user/getInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getInfo();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getCreditHistory = createAsyncThunk<
  ICreditHistory[],
  void,
  { rejectValue: IThunkError }
>("user/getCreditHistory", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getCreditHistory();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getUserState = createAsyncThunk<
  IUserState,
  void,
  { rejectValue: IThunkError }
>("user/getState", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getState();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getUserCreditRate = createAsyncThunk<
  IUserCreditRate,
  void,
  { rejectValue: IThunkError }
>("user/getUserCreditRate", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getCreditRate();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const uploadUserSelfie = createAsyncThunk<
  void,
  FormData,
  { rejectValue: IThunkError }
>("user/uploadSelfie", async (formData, { rejectWithValue }) => {
  try {
    const response = await userService.uploadSelfie(formData);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const uploadUserFrontSideDocument = createAsyncThunk<
  void,
  FormData,
  { rejectValue: IThunkError }
>("user/uploadFrontSideDocument", async (formData, { rejectWithValue }) => {
  try {
    const response = await userService.uploadFrontSideDocument(formData);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const uploadUserBackSideDocument = createAsyncThunk<
  void,
  FormData,
  { rejectValue: IThunkError }
>("user/uploadBackSideDocument", async (formData, { rejectWithValue }) => {
  try {
    const response = await userService.uploadBackSideDocument(formData);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const saveUserAddress = createAsyncThunk<
  void,
  ISaveAddressParams,
  { rejectValue: IThunkError }
>("user/saveAddress", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.saveAddress(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const addUserGuarantors = createAsyncThunk<
  void,
  IAddGuarantorsParams,
  { rejectValue: IThunkError }
>("user/addGuarantors", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.addGuarantors(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const checkUserNeedCompleteProfile = createAsyncThunk<
  boolean,
  void,
  { rejectValue: IThunkError }
>("user/checkUserNeedCompleteProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.checkUserNeedCompleteProfile();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const addUserProfile = createAsyncThunk<
  void,
  IAddProfileParams,
  { rejectValue: IThunkError }
>("user/addProfile", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.addProfile(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getProfileQuestions = createAsyncThunk<
  IProfileQuestion[],
  void,
  { rejectValue: IThunkError }
>("user/getProfileQuestions", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getProfileQuestions();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getUserPhoto = createAsyncThunk<
  Blob,
  void,
  { rejectValue: IThunkError }
>("user/getIdPhoto", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUserPhoto();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const createPassword = createAsyncThunk<
  string,
  ICreatePasswordParams,
  { rejectValue: IThunkError }
>("user/createPassword", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.createPassword(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const verifyUserSelfie = createAsyncThunk<
  void,
  IVerifyUserSelfieParams,
  { rejectValue: IThunkError }
>("user/verifySelfie", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.verifyUserSelfie(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const getCodeToChangePhoneNumber = createAsyncThunk<
  IGetCodeToChangePhoneNumberResponse,
  IGetCodeToChangePhoneNumberParams,
  { rejectValue: IThunkError }
>("user/getCodeToChangePhoneNumber", async (params, { rejectWithValue }) => {
  try {
    const response = await userService.getCodeToChangePhoneNumber(params);
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

export const confirmCodeToChangePhoneNumber = createAsyncThunk<
  IConfirmCodeToChangePhoneNumberResponse,
  IConfirmCodeToChangePhoneNumberParams,
  { rejectValue: IThunkError }
>(
  "user/confirmCodeToChangePhoneNumber",
  async (params, { rejectWithValue }) => {
    try {
      const response = await userService.confirmCodeToChangePhoneNumber(params);
      return response.data;
    } catch (error: any) {
      throw rejectWithValue(error);
    }
  }
);

interface IState {
  info: IUser | null;
  selfie: string | null;
  creditRate: IUserCreditRate | null;
  creditHistory: ICreditHistory[];
  photo: string | null;
  idempotencyKey: string;
  phoneNumber: string;
}

const initialState: IState = {
  info: null,
  selfie: null,
  creditRate: null,
  creditHistory: [],
  photo: null,
  idempotencyKey: "",
  phoneNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
    setSelfie: (state, { payload: selfie }: PayloadAction<string | null>) => {
      state.selfie = selfie;
    },
    setPhoneNumberToUserStore: (state, { payload }: PayloadAction<string>) => {
      state.phoneNumber = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getUserInfo.fulfilled,
        (state, { payload }: PayloadAction<IUser>) => {
          state.info = payload;
        }
      )
      .addCase(
        getUserCreditRate.fulfilled,
        (state, { payload }: PayloadAction<IUserCreditRate>) => {
          state.creditRate = payload;
        }
      )
      .addCase(
        getCreditHistory.fulfilled,
        (state, { payload }: PayloadAction<ICreditHistory[]>) => {
          state.creditHistory = payload;
        }
      )
      .addCase(
        getUserPhoto.fulfilled,
        (state, { payload }: PayloadAction<Blob>) => {
          state.photo = URL.createObjectURL(payload);
        }
      )
      .addCase(
        getCodeToChangePhoneNumber.fulfilled,
        (
          state,
          { payload }: PayloadAction<IGetCodeToChangePhoneNumberResponse>
        ) => {
          state.idempotencyKey = payload.idempotencyKey;
        }
      )
      .addCase(
        confirmCodeToChangePhoneNumber.fulfilled,
        (
          _,
          { payload }: PayloadAction<IConfirmCodeToChangePhoneNumberResponse>
        ) => {
          authTokenHandler.set(payload.token, payload.expires);
        }
      );
  },
});

export const { resetUserState, setSelfie, setPhoneNumberToUserStore } =
  userSlice.actions;

export default userSlice.reducer;
