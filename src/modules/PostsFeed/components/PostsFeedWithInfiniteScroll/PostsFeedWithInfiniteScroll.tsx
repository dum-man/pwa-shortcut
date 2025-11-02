import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getPosts } from "@/store/slices/postSlice";
import { IPost } from "@/types/post";
import { Spinner } from "@/ui";

import Post from "../Post/Post";
import styles from "./styles.module.css";

const PostsFeedWithInfiniteScroll = () => {
  const locale = useLocale();

  const dispatch = useAppDispatch();

  const targetRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let page = 1;
    const limit = 4;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          (async () => {
            setIsLoading(true);
            try {
              const { hasNextPage, items } = await dispatch(
                getPosts({ page: String(page), limit: String(limit), locale })
              ).unwrap();
              setPosts((prev) => [...prev, ...items]);
              page++;
              if (!hasNextPage) {
                if (targetRef.current) observer.unobserve(targetRef.current);
              }
            } catch (error: any) {
              dispatch(setErrorModal({ isOpen: true, ...error }));
            } finally {
              setIsLoading(false);
            }
          })();
        }
      },
      { rootMargin: "100px" }
    );

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [dispatch]);

  return (
    <div className={styles["wrapper"]}>
      <ul className={styles["list"]}>
        {posts.map((post) => (
          <Post key={post.id} isAdmin={false} post={post} />
        ))}
      </ul>
      <div ref={targetRef} />
      {isLoading && <Spinner />}
    </div>
  );
};

export default PostsFeedWithInfiniteScroll;
