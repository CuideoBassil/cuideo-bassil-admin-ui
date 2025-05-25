"use client";

import dynamic from "next/dynamic";
import { FieldErrors } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ErrorMsg from "../common/error-msg";

// Dynamically import ReactQuill to disable SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type IPropType = {
  errors: FieldErrors<any>;
  defaultValue?: string;
  setValue?: any;
  title?: string;
  setData?: (value: string) => void;
};

const DataTextarea = ({ title, errors, defaultValue, setValue }: IPropType) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">
        {title} <span className="text-red">*</span>
      </p>
      <div id="editor" className="text-base">
        <ReactQuill
          theme="snow"
          defaultValue={defaultValue}
          onChange={(e) => {
            setValue(JSON.stringify(e));
          }}
          placeholder="enter text ..."
        />
        <ErrorMsg msg={(errors?.data?.message as string) || ""} />
      </div>
    </div>
  );
};

export default DataTextarea;
