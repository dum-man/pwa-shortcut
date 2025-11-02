import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import azericardReducer from "./slices/azericardSlice";
import catalogReducer from "./slices/catalogSlice";
import creditReducer from "./slices/creditSlice";
import otpReducer from "./slices/otpSlice";
import promoCodeReducer from "./slices/promoCodeSlice";
import questionnaireReducer from "./slices/questionnaireSlice";
import simaReducer from "./slices/simaSlice";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import viewsReducer from "./slices/viewsSlice";
import postReducer from "./slices/postSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    otp: otpReducer,
    azericard: azericardReducer,
    credit: creditReducer,
    promoCode: promoCodeReducer,
    questionnaire: questionnaireReducer,
    sima: simaReducer,
    user: userReducer,
    video: videoReducer,
    views: viewsReducer,
    catalog: catalogReducer,
    ui: uiReducer,
    posts: postReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
