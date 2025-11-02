import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { appService } from "@/services/appService";
import {
  BeforeInstallPromptEvent,
  IAppConfig,
  ICameraModal,
  IDropdown,
  IErrorModal,
  IInfoModal,
  ILoader,
  IModal,
  INewPhoneNumberModal,
  IOtpModal,
  IPopover,
  IThunkError,
} from "@/types/app";

export const getAppConfig = createAsyncThunk<
  IAppConfig,
  void,
  { rejectValue: IThunkError }
>("app/getAppConfig", async (_, { rejectWithValue }) => {
  try {
    const response = await appService.getConfig();
    return response.data;
  } catch (error: any) {
    throw rejectWithValue(error);
  }
});

interface IState {
  config: IAppConfig;
  loginModal: IModal;
  otpModal: IOtpModal;
  cameraModal: ICameraModal;
  errorModal: IErrorModal;
  dropdownMenu: IDropdown;
  popoverMenu: IPopover;
  loader: ILoader;
  infoModal: IInfoModal;
  loginByFinModal: IModal;
  createPasswordModal: IModal;
  registerModal: IModal;
  newPhoneNumberModal: INewPhoneNumberModal;
  changePhoneNumberModal: IModal;
  tempPasswordModal: IModal;
  appLabelModal: IModal;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

const initialState: IState = {
  config: {
    isSimaEnabled: false,
    processingPayType: "",
  },
  loginModal: { isOpen: false },
  otpModal: { isOpen: false },
  cameraModal: { isOpen: false },
  errorModal: { isOpen: false },
  dropdownMenu: { isOpen: false },
  popoverMenu: { isOpen: false },
  loader: { isOpen: false },
  infoModal: { isOpen: false },
  loginByFinModal: { isOpen: false },
  createPasswordModal: { isOpen: false },
  registerModal: { isOpen: false },
  newPhoneNumberModal: { isOpen: false },
  changePhoneNumberModal: { isOpen: false },
  tempPasswordModal: { isOpen: false },
  appLabelModal: { isOpen: false },
  deferredPrompt: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoginModal: (state, { payload }: PayloadAction<IModal>) => {
      state.loginModal = payload;
    },
    setOtpModal: (state, { payload }: PayloadAction<IOtpModal>) => {
      state.otpModal = payload;
    },
    setCameraModal: (state, { payload }: PayloadAction<ICameraModal>) => {
      state.cameraModal = payload;
    },
    setErrorModal: (state, { payload }: PayloadAction<IErrorModal>) => {
      state.errorModal = payload;
    },
    setDropdownMenu: (state, { payload }: PayloadAction<IDropdown>) => {
      state.dropdownMenu = payload;
    },
    setPopoverMenu: (state, { payload }: PayloadAction<IPopover>) => {
      state.popoverMenu = payload;
    },
    setLoader: (state, { payload }: PayloadAction<ILoader>) => {
      state.loader = payload;
    },
    setInfoModal: (state, { payload }: PayloadAction<IInfoModal>) => {
      state.infoModal = payload;
    },
    setLoginByFinModal: (state, { payload }: PayloadAction<IModal>) => {
      state.loginByFinModal = payload;
    },
    setCreatePasswordModal: (state, { payload }: PayloadAction<IModal>) => {
      state.createPasswordModal = payload;
    },
    setRegisterModal: (state, { payload }: PayloadAction<IModal>) => {
      state.registerModal = payload;
    },
    setNewPhoneNumberModal: (
      state,
      { payload }: PayloadAction<INewPhoneNumberModal>
    ) => {
      state.newPhoneNumberModal = payload;
    },
    setChangePhoneNumberModal: (state, { payload }: PayloadAction<IModal>) => {
      state.changePhoneNumberModal = payload;
    },
    setTempPasswordModal: (state, { payload }: PayloadAction<IModal>) => {
      state.tempPasswordModal = payload;
    },
    setAppLabelModal: (state, { payload }: PayloadAction<IModal>) => {
      state.appLabelModal = payload;
    },
    setDeferredPrompt: (
      state,
      { payload }: PayloadAction<BeforeInstallPromptEvent | null>
    ) => {
      state.deferredPrompt = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getAppConfig.fulfilled,
      (state, { payload: config }: PayloadAction<IAppConfig>) => {
        state.config = config;
      }
    );
  },
});

export const {
  setLoginModal,
  setOtpModal,
  setCameraModal,
  setErrorModal,
  setDropdownMenu,
  setPopoverMenu,
  setLoader,
  setInfoModal,
  setLoginByFinModal,
  setCreatePasswordModal,
  setRegisterModal,
  setNewPhoneNumberModal,
  setChangePhoneNumberModal,
  setTempPasswordModal,
  setAppLabelModal,
  setDeferredPrompt,
} = appSlice.actions;

export default appSlice.reducer;
