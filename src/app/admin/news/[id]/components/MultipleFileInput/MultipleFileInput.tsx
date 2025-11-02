/* eslint-disable @next/next/no-img-element */

import { IUploadPostImage } from "@/types/post";

import styles from "./styles.module.css";

interface IProps {
  setImages: (images: IUploadPostImage[]) => void;
}

const MultipleFileInput = ({ setImages }: IProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const jpegFiles = files.filter((file) => file.type === "image/jpeg");

    const readers = jpegFiles.map((file) => {
      return new Promise<IUploadPostImage>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          resolve({
            fileName: file.name,
            data: base64,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers)
      .then((results) => {
        setImages(results);
      })
      .catch((err) => {
        console.error("Ошибка при чтении файлов:", err);
      });
  };

  return (
    <label className={styles["label"]}>
      <input
        type="file"
        accept="image/jpeg"
        multiple
        onChange={handleFileChange}
      />
    </label>
  );
};

export default MultipleFileInput;
