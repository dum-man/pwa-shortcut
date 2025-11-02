import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DEFAULT_NEWS_LIMIT, DEFAULT_NEWS_PAGE } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getPosts } from "@/store/slices/postSlice";
import { Spinner } from "@/ui";

import Pagination from "../Pagination/Pagination";
import Post from "../Post/Post";
import styles from "./styles.module.css";

interface IProps {
  isAdmin?: boolean;
}

const PostsFeedWithPagination = ({ isAdmin }: IProps) => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const locale = useLocale();

  const dispatch = useAppDispatch();

  const { posts, totalPages } = useAppSelector((state) => state.posts);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (!page || !limit) {
      const params = new URLSearchParams(location.search);

      params.set("page", String(DEFAULT_NEWS_PAGE));
      params.set("limit", String(DEFAULT_NEWS_LIMIT));

      router.replace(`?${params.toString()}`);
    } else {
      (async () => {
        setIsLoading(true);
        try {
          await dispatch(getPosts({ page, limit, locale })).unwrap();
        } catch (error: any) {
          dispatch(setErrorModal({ isOpen: true, ...error }));
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [dispatch, router, searchParams, locale]);

  return (
    <>
      <div className={styles["wrapper"]}>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className={styles["list"]}>
            {posts.map((post) => (
              <Post key={post.id} isAdmin={!!isAdmin} post={post} />
            ))}
          </ul>
        )}
      </div>
      <Pagination totalPages={totalPages} />
    </>
  );
};

export default PostsFeedWithPagination;
