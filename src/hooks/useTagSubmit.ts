import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddTagMutation, useEditTagMutation } from "@/redux/tag/tagApi";

const useTagSubmit = () => {
  const router = useRouter();
  // add
  const [addTag, { data: tagData, isError, isLoading }] = useAddTagMutation();
  // add
  const [
    editTag,
    { data: tagEditData, isError: tagIsErr, isLoading: tagLoading },
  ] = useEditTagMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitTag = async (data: any) => {
    try {
      const tag_data = {
        name: data?.name,
      };
      const res = await addTag({ ...tag_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Tag added successfully");

        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditTag = async (data: any, id: string) => {
    try {
      const tag_data = {
        name: data?.name,
      };
      const res = await editTag({ id, data: tag_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Tag update successfully");
        router.push("/product-types");
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    errors,
    handleSubmit,
    register,
    handleSubmitTag,
    handleSubmitEditTag,
  };
};

export default useTagSubmit;
