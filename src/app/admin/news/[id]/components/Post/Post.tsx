import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import PostForm from "@/modules/PostForm";
import {
  deletePost,
  editPost,
  setIsAdminAuth,
} from "@/store/slices/adminSlice";
import { setErrorModal } from "@/store/slices/appSlice";
import { IFullPost } from "@/types/post";
import { Button } from "@/ui";

import GalleryForm from "../GalleryForm/GalleryForm";
import styles from "./styles.module.css";

interface IProps {
  post: IFullPost;
}

const Post = ({ post }: IProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [titleAz, setTitleAz] = useState(post.titleAz);
  const [titleRu, setTitleRu] = useState(post.titleRu);
  const [contentAz, setContentAz] = useState(post.contentAz);
  const [contentRu, setContentRu] = useState(post.contentRu);
  const [coverImgAz, setCoverImgAz] = useState("");
  const [coverImgRu, setCoverImgRu] = useState("");
  const [publishDate, setPublishDate] = useState(post.publishDate);

  const handleEditPost = async () => {
    if (isEditing) {
      return;
    }

    if (!titleAz || !titleRu || !contentAz || !contentRu || !publishDate) {
      return;
    }

    setIsEditing(true);

    try {
      await dispatch(
        editPost({
          id: post.id,
          titleRu,
          titleAz,
          contentRu,
          contentAz,
          publishDate,
          ...(coverImgAz && {
            coverImgAz,
          }),
          ...(coverImgRu && {
            coverImgRu,
          }),
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
      setIsEditing(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      await dispatch(deletePost(post.id)).unwrap();
      router.replace(AppRoutes.AdminNews);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, errorText: error?.message }));
      if (error?.response?.status === 401) {
        dispatch(setIsAdminAuth(false));
        router.replace(AppRoutes.Admin);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className={styles["section"]}>
      <h2 className={styles["title"]}>Add/delete galley images</h2>
      <GalleryForm postId={post.id} images={post.images} />
      <hr className={styles["divider"]} />
      <h2 className={styles["title"]}>Edit/Delete post</h2>
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
        <Button disabled={isEditing} onClick={handleEditPost}>
          Save
        </Button>
        <Button disabled={isDeleting} onClick={handleDeletePost}>
          Delete
        </Button>
      </div>
    </section>
  );
};

export default Post;
