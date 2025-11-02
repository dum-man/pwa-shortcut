import { useRouter } from "next/navigation";
import { useState } from "react";

import { AppRoutes } from "@/config/routes";
import { useAppDispatch } from "@/hooks";
import {
  deletePostImage,
  setIsAdminAuth,
  uploadPostImage,
} from "@/store/slices/adminSlice";
import { setErrorModal } from "@/store/slices/appSlice";
import { IPostImage, IUploadPostImage } from "@/types/post";
import { Button } from "@/ui";

import MultipleFileInput from "../MultipleFileInput/MultipleFileInput";
import styles from "./styles.module.css";

interface IProps {
  postId: string;
  images: IPostImage[];
}

const GalleryForm = ({ postId, images }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [downloadedImages, setDownloadedImages] =
    useState<IPostImage[]>(images);

  const [imagesToUpload, setImagesToUpload] = useState<IUploadPostImage[]>([]);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await dispatch(deletePostImage(id)).unwrap();
      setDownloadedImages((prev) => prev.filter((img) => img.id !== id));
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

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await Promise.allSettled(
        imagesToUpload.map(({ fileName, data }) =>
          dispatch(uploadPostImage({ postId, fileName, data })).unwrap()
        )
      );
      router.push(AppRoutes.AdminNews);
    } catch (error: any) {
      dispatch(setErrorModal({ isOpen: true, errorText: error?.message }));
      if (error?.response?.status === 401) {
        dispatch(setIsAdminAuth(false));
        router.replace(AppRoutes.Admin);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {downloadedImages.length ? (
        <ul className={styles["list"]}>
          {downloadedImages.map(({ id, fileName }) => (
            <li key={id} className={styles["list-item"]}>
              <p>{fileName}</p>
              <button disabled={isDeleting} onClick={() => handleDelete(id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images attached</p>
      )}
      <br />
      <MultipleFileInput setImages={setImagesToUpload} />
      {Boolean(imagesToUpload.length) && (
        <Button
          type="button"
          size="xs"
          disabled={isSaving}
          onClick={handleSave}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default GalleryForm;
