import {
  useAddDeliveryDistrictMutation,
  useEditDeliveryDistrictMutation,
} from "@/redux/delivery-district/deliveryDistrictApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useDeliveryDistrictSubmit = () => {
  const [status, setStatus] = useState<string>("active");
  const [logo, setLogo] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [
    addDeliveryDistrict,
    { data: deliveryDistrictData, isError, isLoading },
  ] = useAddDeliveryDistrictMutation();
  // add
  const [
    editDeliveryDistrict,
    {
      data: deliveryDistrictEditData,
      isError: deliveryDistrictIsErr,
      isLoading: deliveryDistrictLoading,
    },
  ] = useEditDeliveryDistrictMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitDeliveryDistrict = async (data: any) => {
    try {
      const deliveryDistrict_data = {
        name: data?.name,
        deliveryCost: data?.deliverycost,
      };
      const res = await addDeliveryDistrict({ ...deliveryDistrict_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("DeliveryDistrict added successfully");
        setIsSubmitted(true);
        reset();
        setLogo("");
      }
    } catch (error) {
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit DeliveryDistrict
  const handleSubmitEditDeliveryDistrict = async (data: any, id: string) => {
    try {
      const deliveryDistrict_data = {
        name: data?.name,
        deliveryCost: data?.deliverycost,
      };
      const res = await editDeliveryDistrict({
        id,
        data: deliveryDistrict_data,
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("DeliveryDistrict update successfully");
        router.push("/delivery-districts");
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
    handleSubmitDeliveryDistrict,
    setLogo,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditDeliveryDistrict,
  };
};

export default useDeliveryDistrictSubmit;
