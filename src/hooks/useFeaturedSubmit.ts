import {
  useAddFeaturedMutation,
  useEditFeaturedMutation,
} from "@/redux/featured/featuredApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const useFeaturedSubmit = () => {
  const [itemImage, setItemImage] = useState<string>("");
  const [hex, setHex] = useState("#fff");
  const [isImageSubmitted, setIsImageSubmitted] = useState<boolean>(false);
  const [section, setSection] = useState<number>(1);
  useEffect(() => {
    console.log("hex: ", hex);
  }, [hex]);
  const router = useRouter();
  // add
  const [addFeatured, { data: featuredData, isError, isLoading }] =
    useAddFeaturedMutation();
  // add
  const [
    editFeatured,
    {
      data: featuredEditData,
      isError: featuredIsErr,
      isLoading: featuredLoading,
    },
  ] = useEditFeaturedMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  // submit handle
  const handleSubmitFeatured = async (data: any) => {
    console.log("data-->", data);
    console.log("image-->", itemImage);

    try {
      const featured_data = {
        title: data?.title,
        description: data?.description,
        price: data?.price,
        discounted: data?.discounted,
        section: section,
        img: itemImage,
        background: hex,
      };
      const res = await addFeatured({ ...featured_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Featured added successfully");
        setIsImageSubmitted(true);
        reset();
        setItemImage("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditFeatured = async (data: any, id: string) => {
    console.log("data-->", data);
    try {
      const featured_data = {
        title: data?.title,
        description: data?.description,
        price: data?.price,
        discounted: data?.discounted,
        section: section,
        img: itemImage,
        background: hex,
      };
      const res = await editFeatured({ id, data: featured_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Featured update successfully");
        router.push("/featured");
        setIsImageSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setItemImage,
    handleSubmitFeatured,
    isImageSubmitted,
    setIsImageSubmitted,
    handleSubmitEditFeatured,
    setSection,
    section,
    setHex,
    hex,
    control,
  };
};

export default useFeaturedSubmit;
