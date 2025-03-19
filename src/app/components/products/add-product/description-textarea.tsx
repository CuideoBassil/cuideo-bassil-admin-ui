import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMsg from "../../common/error-msg";

type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?: string;
};

const DescriptionTextarea = ({ register, errors, defaultValue }: IPropType) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">
        Description <span className="text-red">*</span>
      </p>
      <div id="editor" className="text-base">
        <textarea
          {...register("description", {
            required: `description is required!`,
          })}
          placeholder="Product Description"
          className="input min-h-[120px]  w-full py-3 text-base"
          defaultValue={defaultValue}
        />
        <ErrorMsg msg={(errors?.description?.message as string) || ""} />
      </div>
    </div>
  );
};

export default DescriptionTextarea;
