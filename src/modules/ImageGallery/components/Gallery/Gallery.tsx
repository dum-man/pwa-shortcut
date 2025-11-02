import { InitDetail } from "lightgallery/lg-events";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";

interface IProps {
  base64Images: string[];
  onGalleryInit: (ref: InitDetail) => void;
}

const Gallery = ({ base64Images, onGalleryInit }: IProps) => {
  return (
    <LightGallery
      dynamic={true}
      closable={true}
      zoom={false}
      download={false}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      dynamicEl={base64Images.map((base64Image) => ({
        src: base64Image,
        thumb: base64Image,
      }))}
      onInit={onGalleryInit}
    />
  );
};

export default Gallery;
