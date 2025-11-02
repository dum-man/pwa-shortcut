import { TextEditor } from "@/components";

import DateInput from "../DateInput/DateInput";
import FileInput from "../FileInput/FileInput";
import TextInput from "../TextInput/TextInput";

import styles from "./styles.module.css";

interface IProps {
  titleAz: string;
  titleRu: string;
  contentAz: string;
  contentRu: string;
  publishDate: string;
  setTitleAz: React.Dispatch<React.SetStateAction<string>>;
  setTitleRu: React.Dispatch<React.SetStateAction<string>>;
  setContentAz: React.Dispatch<React.SetStateAction<string>>;
  setContentRu: React.Dispatch<React.SetStateAction<string>>;
  setCoverImgAz: React.Dispatch<React.SetStateAction<string>>;
  setCoverImgRu: React.Dispatch<React.SetStateAction<string>>;
  setPublishDate: React.Dispatch<React.SetStateAction<string>>;
}

const PostForm = ({
  titleAz,
  titleRu,
  contentAz,
  contentRu,
  publishDate,
  setTitleAz,
  setTitleRu,
  setContentAz,
  setContentRu,
  setCoverImgAz,
  setCoverImgRu,
  setPublishDate,
}: IProps) => {
  return (
    <form className={styles["form"]}>
      <DateInput
        value={publishDate}
        onChange={(evt) => setPublishDate(evt.target.value)}
      />

      <div className={styles["fieldset-wrapper"]}>
        <fieldset className={styles["fieldset"]}>
          <legend className={styles["legend"]}>AZ</legend>

          <TextInput
            label="Heading"
            value={titleAz}
            onChange={(evt) => setTitleAz(evt.target.value)}
          />

          <FileInput onChange={setCoverImgAz} />

          <TextEditor value={contentAz} onChange={setContentAz} />
        </fieldset>

        <fieldset className={styles["fieldset"]}>
          <legend className={styles["legend"]}>RU</legend>
          <TextInput
            label="Heading"
            value={titleRu}
            onChange={(evt) => setTitleRu(evt.target.value)}
          />

          <FileInput onChange={setCoverImgRu} />

          <TextEditor value={contentRu} onChange={setContentRu} />
        </fieldset>
      </div>
    </form>
  );
};

export default PostForm;
