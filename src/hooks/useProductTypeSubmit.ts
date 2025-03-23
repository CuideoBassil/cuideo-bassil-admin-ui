import {
  useAddProductTypeMutation,
  useEditProductTypeMutation,
} from "@/redux/product-type/productTypeApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useProductTypeSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();
  // add
  const [addProductType, { data: productTypeData, isError, isLoading }] =
    useAddProductTypeMutation();
  // add
  const [
    editProductType,
    {
      data: productTypeEditData,
      isError: productTypeIsErr,
      isLoading: productTypeLoading,
    },
  ] = useEditProductTypeMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitProductType = async (data: any) => {
    console.log(data);
    try {
      const productType_data = {
        name: data?.name,
        image: logo,
      };
      const res = await addProductType({ ...productType_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("ProductType added successfully");

        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditProductType = async (data: any, id: string) => {
    try {
      const productType_data = {
        name: data?.name,
        image: logo,
      };
      const res = await editProductType({ id, data: productType_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("ProductType update successfully");
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
    handleSubmitProductType,
    handleSubmitEditProductType,
    setLogo,
    isSubmitted,
    setIsSubmitted,
  };
};

export default useProductTypeSubmit;
