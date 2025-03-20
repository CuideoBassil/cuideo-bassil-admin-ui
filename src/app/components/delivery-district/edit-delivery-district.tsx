"use client";

import useDeliveryDistrictSubmit from "@/hooks/useDeliveryDistrictSubmit";
import { useGetDeliveryDistrictQuery } from "@/redux/delivery-district/deliveryDistrictApi";
import ErrorMsg from "../common/error-msg";
import Loading from "../common/loading";
import DeliveryDistrictTables from "./delivery-district-table";
import DeliveryDistrictFormField from "./form-field-two";

const EditDeliveryDistrict = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    register,
    setStatus,
    handleSubmitEditDeliveryDistrict,
  } = useDeliveryDistrictSubmit();
  // get deliveryDistrict
  const {
    data: deliveryDistrict,
    isLoading,
    isError,
    error,
  } = useGetDeliveryDistrictQuery(id);

  // handle Change status
  const handleChange = (value: string | undefined) => {
    setStatus(value as string);
  };

  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (!deliveryDistrict && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (deliveryDistrict && !isError) {
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form
          onSubmit={handleSubmit((data) =>
            handleSubmitEditDeliveryDistrict(data, id)
          )}
        >
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <DeliveryDistrictFormField
              default_val={deliveryDistrict.name}
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />
            <DeliveryDistrictFormField
              default_val={deliveryDistrict.deliveryCost}
              register={register}
              errors={errors}
              name="DeliveryCost"
              isReq={true}
            />
            <button className="tp-btn px-7 py-2">Edit Delivery District</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        {/* deliveryDistrict table start */}
        <DeliveryDistrictTables />
        {/* deliveryDistrict table end */}
      </div>
    </div>
  );
};

export default EditDeliveryDistrict;
