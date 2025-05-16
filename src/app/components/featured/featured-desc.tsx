import { UseFormRegister } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FeaturedDesc = ({
  default_val,
  register,
  setValue,
}: {
  default_val?: string;
  setValue?: any;
  register: UseFormRegister<any>;
}) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Description</p>
      <div id="editor" className="text-base">
        <ReactQuill
          theme="snow"
          defaultValue={default_val}
          onChange={(e) => {
            setValue(e);
          }}
          placeholder="Description..."
          modules={modules}
          formats={[
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "color",
            "background",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "clean",
            "header",
            "lineHeight",
          ]}
        />
      </div>
    </div>
  );
};

export default FeaturedDesc;
