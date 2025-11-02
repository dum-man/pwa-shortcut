"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import { PostCover } from "@/components";
import { useAppDispatch } from "@/hooks";
import ImageGallery from "@/modules/ImageGallery";
import { setErrorModal } from "@/store/slices/appSlice";
import { getPostById } from "@/store/slices/postSlice";
import { IPost } from "@/types/post";
import { Spinner } from "@/ui";

import styles from "./styles.module.css";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const locale = useLocale();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [post, setPost] = useState<IPost | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await dispatch(getPostById({ id, locale })).unwrap();
        setPost(response);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, id, locale]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  if (post) {
    return (
      <section className={styles["section"]}>
        <h2 className={styles["title"]}>{post.title}</h2>
        <PostCover imageId={post.coverImg} />
        <div
          className={styles["content"]}
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
        {Boolean(post.images.length) && <ImageGallery images={post.images} />}
      </section>
    );
  }

  return null;
};

export default Page;
