import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAppDispatch } from "@/hooks";
import { setErrorModal, setInfoModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { checkVideoUploaded } from "@/store/slices/videoSlice";
import { InfoType } from "@/types/app";
import { getUserRoute } from "@/utils";
import { authTokenHandler } from "@/utils/handlers";

import styles from "./styles.module.css";

const VideoMessage = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleNavigate = async () => {
      const userState = await dispatch(getUserState()).unwrap();
      const route = getUserRoute(userState);
      router.replace(route);
    };

    const pollVideoMessageState = async () => {
      try {
        const isVideoUploaded = await dispatch(checkVideoUploaded()).unwrap();
        if (isVideoUploaded) {
          clearTimeout(timeoutId);
          await handleNavigate();
        } else {
          timeoutId = setTimeout(pollVideoMessageState, 3000);
        }
      } catch (error: any) {
        timeoutId = setTimeout(pollVideoMessageState, 3000);
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    };

    pollVideoMessageState();

    return () => clearTimeout(timeoutId);
  }, [dispatch, router]);

  useEffect(() => {
    dispatch(
      setInfoModal({ isOpen: true, type: InfoType.CONSENT_FOR_VIDEO_MESSAGE })
    );
  }, [dispatch]);

  return (
    <iframe
      className={styles["iframe"]}
      allow="camera;microphone"
      src={`${
        process.env.NEXT_PUBLIC_API_URL
      }video/instruction?token=${authTokenHandler.get()}`}
    />
  );
};

export default VideoMessage;
