"use client";
import { useAddPageMutation, useEditPageMutation } from "@/redux/page/pageApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const usePageSubmit = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [data, setData] = useState<string>();
  const router = useRouter();

  const [addPage, { isLoading: addLoading }] = useAddPageMutation();
  const [editPage, { isLoading: editLoading }] = useEditPageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Add new page
  const handleSubmitPage = async () => {
    const pageData = {
      key: "about",
      data: data,
    };

    try {
      const res = await addPage(pageData);
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Added successfully");
        setIsSubmitted(true);
        router.push("/pages/about");
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  const handleSubmitEditPage = async () => {
    try {
      const pageData = {
        key: "about",
        data: data,
      };
      const res = await editPage({
        id: "682e54949b1d3b0ddbf8c26d",
        data: pageData,
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Updated successfully");
        router.push("/about");
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  // Edit existing page
  // const handleSubmitEditPage = async (id: string) => {
  //   const pageData = {
  //     key: "about",
  //     data: data,
  //   };

  //   try {
  //     const res = await editPage({
  //       id: "682e54949b1d3b0ddbf8c26d",
  //       data: pageData,
  //     });
  //     if ("error" in res) {
  //       if ("data" in res.error) {
  //         const errorData = res.error.data as { message?: string };
  //         if (typeof errorData.message === "string") {
  //           return notifyError(errorData.message);
  //         }
  //       }
  //     } else {
  //       notifySuccess("Added successfully");
  //       setIsSubmitted(true);
  //       router.push("/pages");
  //       reset();
  //     }
  //   } catch (error) {
  //     notifyError("Something went wrong");
  //   }
  // };

  return {
    register,
    handleSubmit,
    errors,
    handleSubmitPage,
    handleSubmitEditPage,
    isSubmitted,
    setIsSubmitted,
    data,
    setData,
  };
};

export default usePageSubmit;
