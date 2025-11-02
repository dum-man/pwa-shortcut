import { $store } from "@/store/injectStore";
import { resetAuthState } from "@/store/slices/authSlice";
import { resetAzericardState } from "@/store/slices/azericardSlice";
import { resetCreditState } from "@/store/slices/creditSlice";
import { resetOtpState } from "@/store/slices/otpSlice";
import { resetPromoCodeState } from "@/store/slices/promoCodeSlice";
import { resetQuestionnaireState } from "@/store/slices/questionnaireSlice";
import { resetSimaState } from "@/store/slices/simaSlice";
import { resetUserState } from "@/store/slices/userSlice";
import { resetVideoState } from "@/store/slices/videoSlice";
import { resetViewsState } from "@/store/slices/viewsSlice";
import { deleteCookie, getCookie, setCookie } from ".";

export const handleResetStores = () => {
  $store.dispatch(resetAuthState());
  $store.dispatch(resetAzericardState());
  $store.dispatch(resetCreditState());
  $store.dispatch(resetOtpState());
  $store.dispatch(resetPromoCodeState());
  $store.dispatch(resetQuestionnaireState());
  $store.dispatch(resetSimaState());
  $store.dispatch(resetUserState());
  $store.dispatch(resetVideoState());
  $store.dispatch(resetViewsState());
};

export const authTokenHandler = {
  get() {
    return getCookie("token");
  },
  set(token: string, expires: number) {
    setCookie("token", token, expires);
  },
  remove() {
    deleteCookie("token");
  },
};

export const operationIdHandler = {
  get() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("operationId") ?? "";
    }
    return "";
  },
  set(value: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("operationId", value);
    }
  },
  remove() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("operationId");
    }
  },
};
