"use client";

import useTagSubmit from "@/hooks/useTagSubmit";
import { useGetTagQuery } from "@/redux/tag/tagApi";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import FormField from "./form-field-two";
import TagTables from "./tag-table";

const EditTag = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    register,

    handleSubmitEditTag,
  } = useTagSubmit();
  // get tag
  const { data: tag, isLoading, isError, error } = useGetTagQuery(id);

  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (!tag && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (tag && !isError) {
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit((data) => handleSubmitEditTag(data, id))}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <FormField
              default_val={tag.name}
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />

            <button className="tp-btn px-7 py-2">Edit Product Type</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        {/* Tag table start */}
        <TagTables />
        {/* Tag table end */}
      </div>
    </div>
  );
};

export default EditTag;
