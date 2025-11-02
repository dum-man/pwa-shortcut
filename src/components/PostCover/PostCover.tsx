/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

import { useAppDispatch } from "@/hooks";
import { getPostImage } from "@/store/slices/postSlice";

import styles from "./styles.module.css";

interface IProps {
  imageId: string;
}

const PostCover = ({ imageId }: IProps) => {
  const dispatch = useAppDispatch();

  const [base64Image, setBase64Image] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getPostImage(imageId)).unwrap();
        setBase64Image(`data:image/jpeg;base64,${response}`);
      } catch (error) {}
    })();
  }, [dispatch, imageId]);

  if (base64Image) {
    return <img className={styles["image"]} src={base64Image} alt="" />;
  }

  return null;
};

export default PostCover;
