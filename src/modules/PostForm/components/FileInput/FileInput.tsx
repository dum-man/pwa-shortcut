import styles from "./styles.module.css";

interface IProps {
  onChange: (base64Data: string) => void;
}

const FileInput = ({ onChange }: IProps) => {
  return (
    <label className={styles["label"]}>
      <p>Cover</p>
      <input
        type="file"
        accept="image/jpeg"
        onChange={(evt) => {
          const file = evt.target.files?.[0];

          if (!file) return;

          const reader = new FileReader();

          reader.onload = () => {
            const result = reader.result as string;
            const base64Data = result.split(",")[1];
            onChange(base64Data);
          };

          reader.readAsDataURL(file);
        }}
      />
    </label>
  );
};

export default FileInput;
