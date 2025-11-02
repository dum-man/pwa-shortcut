import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const TextEditor = ({ value, onChange }: IProps) => {
  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image", "video"],
        ],
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ]}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextEditor;
