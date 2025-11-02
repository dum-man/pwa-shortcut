import Image from "next/image";

import CameraIcon from "@/assets/camera-icon.svg";

import styles from "./styles.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  docSide: "front" | "back";
}

const ScanButton = (props: IProps) => {
  const { docSide, ...restProps } = props;

  return (
    <button className={styles["image-button"]} {...restProps}>
      <Image
        src={`/images/${docSide}-id-new.webp`}
        width={250}
        height={162}
        quality={100}
        alt="front-doc"
      />
      <CameraIcon width={100} height={100} />
      <div className={styles["overlay"]} />
    </button>
  );
};

export default ScanButton;
