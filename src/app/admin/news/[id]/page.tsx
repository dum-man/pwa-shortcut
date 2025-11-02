"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import { getFullPost, setIsAdminAuth } from "@/store/slices/adminSlice";
import { setErrorModal } from "@/store/slices/appSlice";
import { IFullPost } from "@/types/post";
import { Spinner } from "@/ui";

import Post from "./components/Post/Post";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<IFullPost | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const post = await dispatch(getFullPost(id)).unwrap();
        setPost(post);
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, errorText: error?.message }));
        if (error?.response?.status === 401) {
          dispatch(setIsAdminAuth(false));
          router.replace(AppRoutes.Admin);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, router, id]);

  if (isLoading) {
    return <Spinner fullSize />;
  }

  if (post) {
    return <Post post={post} />;
  }

  return null;
};

export default Page;
