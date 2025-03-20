import {
  useAddBrandMutation,
  useEditBrandMutation,
} from "@/redux/brand/brandApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useBrandSubmit = () => {
  const [status, setStatus] = useState<string>("active");
  const [logo, setLogo] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [addBrand, { data: brandData, isError, isLoading }] =
    useAddBrandMutation();
  // add
  const [
    editBrand,
    { data: brandEditData, isError: brandIsErr, isLoading: brandLoading },
  ] = useEditBrandMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitBrand = async (data: any) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status,
      };
      const res = await addBrand({ ...brand_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Brand added successfully");
        setIsSubmitted(true);
        reset();
        setLogo("");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditBrand = async (data: any, id: string) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status,
      };
      const res = await editBrand({ id, data: brand_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Brand update successfully");
        router.push("/brands");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setStatus,
    handleSubmitBrand,
    setLogo,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditBrand,
  };
};

export default useBrandSubmit;
