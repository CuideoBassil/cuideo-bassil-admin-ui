"use client";
import useTagSubmit from "@/hooks/useTagSubmit";
import FormField from "./form-field-two";
import TagTables from "./tag-table";

const AddTag = () => {
  const { errors, handleSubmit, register, handleSubmitTag } = useTagSubmit();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitTag)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <FormField
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />

            {/* Form Field */}

            <button className="tp-btn px-7 py-2">Add Tag</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* brand table start */}
        <TagTables />
        {/* brand table end */}
      </div>
    </div>
  );
};

export default AddTag;
