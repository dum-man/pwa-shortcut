"use client";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { injectStore } from "@/store/injectStore";
import { setIsAdminAuth } from "@/store/slices/adminSlice";
import {
  getAppConfig,
  setDeferredPrompt,
  setErrorModal,
  setInfoModal,
} from "@/store/slices/appSlice";
import { setIsAuth } from "@/store/slices/authSlice";
import {
  getUserCreditRate,
  getUserInfo,
  getUserPhoto,
} from "@/store/slices/userSlice";
import { store } from "@/store/store";
import { BeforeInstallPromptEvent, InfoType } from "@/types/app";
import { getCookie, isWebview } from "@/utils";
import { authTokenHandler, handleResetStores } from "@/utils/handlers";
import { promotionCookieInit } from "@/utils/promotion";

promotionCookieInit();
injectStore(store);

interface AppProps {
  children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isWebview(window.navigator.userAgent)) {
      dispatch(setInfoModal({ isOpen: true, type: InfoType.IN_APP_VIEW }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (getCookie("adminToken")) {
      dispatch(setIsAdminAuth(true));
    }
  }, [dispatch]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await dispatch(getUserInfo()).unwrap();
        dispatch(setIsAuth(true));
        await dispatch(getUserCreditRate()).unwrap();
        await dispatch(getUserPhoto()).unwrap();
      } catch (error) {}
    };
    if (authTokenHandler.get()) {
      makeRequest();
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await dispatch(getAppConfig()).unwrap();
      } catch (error) {}
    };
    makeRequest();
  }, [dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (!authTokenHandler.get() && isAuth) {
          handleResetStores();
          dispatch(setErrorModal({ isOpen: true, errorCode: 401 }));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, isAuth]);

    useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);


    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (process.env.NEXT_PUBLIC_ENV === "test") {
    return <noindex>{children}</noindex>;
  }

  return children;
};

export default App;
