"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { setErrorModal, setLoader } from "@/store/slices/appSlice";
import { getSimaOperationStatus } from "@/store/slices/simaSlice";
import { LoaderType } from "@/types/app";
import { ISimaOperationStatus } from "@/types/sima";
import { Spinner } from "@/ui";
import { authTokenHandler, operationIdHandler } from "@/utils/handlers";

import Signed from "./components/Signed/Signed";

const Page = () => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  // так как мы не знаем как пользователь попадает на эту страницу, мы проверяем наличие operationId в двух местах
  // если пользователь пришел после реидиректа внутри сайта, то operationId будет взят из localStorage
  // если пользователь пришел после редиректа со сторонего сервиса, operationId будет взят из query params
  const operationIdFromLocalStorage = operationIdHandler.get();
  const [operationIdFromSearchParams] = useState(() =>
    searchParams.get("operationId")
  );
  const operationId =
    operationIdFromSearchParams || operationIdFromLocalStorage;

  // токен после редиректа с симы необходимый для завершения клиентского пути вне зависимости от браузера на который произошел редирект
  // при этом если переход на эту страницу произошел внутри сайта, токен будет пустым
  const [token] = useState(() => searchParams.get("token"));

  const setLoaderOpen = () =>
    dispatch(setLoader({ isOpen: true, type: LoaderType.FULL }));

  const setLoaderClose = () =>
    dispatch(setLoader({ isOpen: false, type: LoaderType.FULL }));

  useEffect(() => {
    if (token) {
      authTokenHandler.set(token, 45);
      router.replace(window.location.pathname);
    }
  }, [token, router]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleSimaSigned = () => {
      setIsSigned(true);
      setIsLoading(false);
      setLoaderClose();
    };

    const handleSimaFailed = () => {
      setLoaderClose();
      dispatch(
        setErrorModal({ isOpen: true, errorText: t("errorModal.text.3") })
      );
      router.replace(AppRoutes.User);
    };

    const pollSimaOperationStatus = async () => {
      if (!operationId) return;
      try {
        const operationStatus = await dispatch(
          getSimaOperationStatus(operationId)
        ).unwrap();
        if (operationStatus === ISimaOperationStatus.Signed) {
          handleSimaSigned();
          clearTimeout(timeoutId);
        } else if (operationStatus === ISimaOperationStatus.Failed) {
          handleSimaFailed();
        } else {
          timeoutId = setTimeout(pollSimaOperationStatus, 3000);
        }
      } catch (error: any) {
        timeoutId = setTimeout(pollSimaOperationStatus, 3000);
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    };

    const makeRequest = async () => {
      if (!operationId) return;
      setLoaderOpen();
      try {
        const operationStatus = await dispatch(
          getSimaOperationStatus(operationId)
        ).unwrap();
        if (operationStatus === ISimaOperationStatus.Signed) {
          handleSimaSigned();
        } else if (operationStatus === ISimaOperationStatus.Failed) {
          handleSimaFailed();
        } else {
          pollSimaOperationStatus();
        }
      } catch (error: any) {
        setLoaderClose();
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    };

    if (operationId) {
      makeRequest();
    } else {
      router.replace(AppRoutes.User);
    }

    return () => clearTimeout(timeoutId);
  }, [dispatch, router, operationId]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  if (isSigned) {
    return <Signed />;
  }

  return null;
};

export default Page;
