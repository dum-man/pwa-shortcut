import { InitDetail } from "lightgallery/lg-events";
import { useEffect, useRef, useState } from "react";

import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";
import "swiper/css";
import "swiper/css/pagination";

import { useAppDispatch } from "@/hooks";
import { setErrorModal } from "@/store/slices/appSlice";
import { getPostImage } from "@/store/slices/postSlice";
import { IPostImage } from "@/types/post";
import { Spinner } from "@/ui";

import Carousel from "../Carousel/Carousel";
import Gallery from "../Gallery/Gallery";
import "./styles.css";

interface IProps {
  images: IPostImage[];
}

const ImageGallery = ({ images }: IProps) => {
  const dispatch = useAppDispatch();

  const galleryRef = useRef<any>(null);

  const [base64Images, setBase64Images] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const handleGalleryInit = (ref: InitDetail) => {
    galleryRef.current = ref.instance;
  };

  const handleGalleryOpen = (index: number) => {
    galleryRef.current?.openGallery(index);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await Promise.all(
          images.map((image) => dispatch(getPostImage(image.id)).unwrap())
        );
        setBase64Images(result.map((img) => `data:image/jpeg;base64,${img}`));
      } catch (error: any) {
        dispatch(setErrorModal({ isOpen: true, ...error }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, images]);

  if (isLoading) {
    return <Spinner />;
  }

  if (base64Images.length) {
    return (
      <>
        <Carousel
          base64Images={base64Images}
          onGalleryOpen={handleGalleryOpen}
        />
        <Gallery
          base64Images={base64Images}
          onGalleryInit={handleGalleryInit}
        />
      </>
    );
  }

  return null;
};

export default ImageGallery;
