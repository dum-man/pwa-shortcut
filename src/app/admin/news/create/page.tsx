"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import PostForm from "@/modules/PostForm";
import { createPost, setIsAdminAuth } from "@/store/slices/adminSlice";
import { setErrorModal } from "@/store/slices/appSlice";
import { Button } from "@/ui";

import styles from "./styles.module.css";

const Page = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [titleAz, setTitleAz] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [contentAz, setContentAz] = useState("");
  const [contentRu, setContentRu] = useState("");
  const [coverImgAz, setCoverImgAz] = useState("");
  const [coverImgRu, setCoverImgRu] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    if (
      !titleAz ||
      !titleRu ||
      !contentAz ||
      !contentRu ||
      !coverImgAz ||
      !coverImgRu ||
      !publishDate
    ) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(
        createPost({
          titleAz,
          titleRu,
          contentAz,
          contentRu,
          coverImgAz,
          coverImgRu,
          publishDate,
        })
      ).unwrap();
      router.replace(AppRoutes.AdminNews);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, errorText: error?.message }));
      if (error?.response?.status === 401) {
        dispatch(setIsAdminAuth(false));
        router.replace(AppRoutes.Admin);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles["section"]}>
      <h2 className={styles["title"]}>Create post</h2>
      <PostForm
        titleAz={titleAz}
        titleRu={titleRu}
        contentAz={contentAz}
        contentRu={contentRu}
        publishDate={publishDate}
        setTitleAz={setTitleAz}
        setTitleRu={setTitleRu}
        setContentAz={setContentAz}
        setContentRu={setContentRu}
        setCoverImgAz={setCoverImgAz}
        setCoverImgRu={setCoverImgRu}
        setPublishDate={setPublishDate}
      />
      <div className={styles["buttons-wrapper"]}>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </section>
  );
};

export default Page;
