"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProgressBar } from "@/components";
import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getUserState } from "@/store/slices/userSlice";
import { checkVideoUploaded } from "@/store/slices/videoSlice";
import { Spinner } from "@/ui";
import { getUserRoute } from "@/utils";

import VideoMessage from "./components/VideoMessage/VideoMessage";
import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleNavigate = async () => {
      const userState = await dispatch(getUserState()).unwrap();
      const route = getUserRoute(userState);
      router.replace(route);
    };

    (async () => {
      try {
        const isVideoUploaded = await dispatch(checkVideoUploaded()).unwrap();
        if (isVideoUploaded) {
          await handleNavigate();
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      }
    })();
  }, [dispatch, router]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  return (
    <section className={styles["section"]}>
      <ProgressBar progress={80} />
      <div className={styles["wrapper"]}>
        <VideoMessage />
      </div>
    </section>
  );
};

export default Page;
