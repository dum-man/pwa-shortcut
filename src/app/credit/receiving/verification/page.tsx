"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal, setLoader } from "@/store/slices/appSlice";
import {
  getCreditVerificationStatus,
  initCreditVerification,
} from "@/store/slices/creditSlice";
import { getUserInfo, getUserState } from "@/store/slices/userSlice";
import { LoaderType } from "@/types/app";
import { Spinner } from "@/ui";
import { getUserRoute } from "@/utils";
import { authTokenHandler } from "@/utils/handlers";

const Page = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { sum, days } = useAppSelector((state) => state.credit.creditToReceive);

  const setLoaderClose = () =>
    dispatch(setLoader({ isOpen: false, type: LoaderType.FULL }));

  useEffect(() => {
    let errorCount = 0;

    const handleNavigate = async () => {
      const userState = await dispatch(getUserState()).unwrap();
      const route = getUserRoute(userState);
      router.replace(route);
    };

    const initVerificationStatusPolling = () => {
      let timeoutId: NodeJS.Timeout;

      const pollVerificationStatus = async () => {
        try {
          const response = await dispatch(
            getCreditVerificationStatus()
          ).unwrap();
          if (response.status === "Success") {
            clearTimeout(timeoutId);
            // если получили accessToken значит произошло объединение анкет, нужно обновить токен и перезапросить информацию о пользователе
            if (response.accessToken) {
              authTokenHandler.set(
                response.accessToken,
                response.accessTokenLifeTimeInMinutes
              );
              await dispatch(getUserInfo()).unwrap();
              router.replace(AppRoutes.CreditReceivingCalculator);
            } else {
              router.replace(AppRoutes.CreditReceiving);
            }
            setLoaderClose();
          } else if (response.status === "Rejected") {
            setLoaderClose();
            clearTimeout(timeoutId);
            dispatch(
              setErrorModal({
                isOpen: true,
                errorText: response.verificationMessages,
              })
            );
            await handleNavigate();
          } else if (response.status === "Pending") {
            timeoutId = setTimeout(pollVerificationStatus, 5000);
          }
        } catch (error: any) {
          if (errorCount < 5) {
            timeoutId = setTimeout(pollVerificationStatus, 5000);
            errorCount++;
          } else {
            clearTimeout(timeoutId);
            setLoaderClose();
            dispatch(setErrorModal({ isOpen: true, ...error }));
            router.replace(AppRoutes.User);
          }
        }
      };

      pollVerificationStatus();
    };

    const makeRequest = async () => {
      try {
        const userState = await dispatch(getUserState()).unwrap();

        const {
          hasDocumentFrontSide,
          hasDocumentBackSide,
          hasSelfie,
          needClientProfile,
          isVideoAttached,
          hasGuarantors,
        } = userState;

        const isClientCompletedJourneyMap = [
          hasDocumentFrontSide,
          hasDocumentBackSide,
          hasSelfie,
          !needClientProfile,
          isVideoAttached,
          hasGuarantors,
        ].every((value) => value);

        if (isClientCompletedJourneyMap) {
          await dispatch(initCreditVerification()).unwrap();
          dispatch(setLoader({ isOpen: true, type: LoaderType.FULL }));
          initVerificationStatusPolling();
        } else {
          const route = getUserRoute(userState);
          router.replace(route);
        }
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
        router.replace(AppRoutes.User);
      }
    };

    if (!sum || !days) {
      router.replace(AppRoutes.CreditReceivingCalculator);
    } else {
      makeRequest();
    }
  }, [dispatch, router]);

  return <Spinner fullSize />;
};

export default Page;
