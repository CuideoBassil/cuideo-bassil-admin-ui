"use client";

import dynamic from "next/dynamic";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ErrorMsg from "../../common/error-msg";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?: string;
  setValue?: any;
};

const DescriptionTextarea = ({
  register,
  errors,
  defaultValue,
  setValue,
}: IPropType) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">
        Description <span className="text-red">*</span>
      </p>
      <div id="editor" className="text-base">
        <ReactQuill
          theme="snow"
          defaultValue={defaultValue}
          onChange={(e) => setValue(e)}
          placeholder="Description..."
        />
        <ErrorMsg msg={(errors?.description?.message as string) || ""} />
      </div>
    </div>
  );
};

export default DescriptionTextarea;
