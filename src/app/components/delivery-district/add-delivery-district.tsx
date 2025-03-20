"use client";
import useDeliveryDistrictSubmit from "@/hooks/useDeliveryDistrictSubmit";
import DeliveryDistrictTables from "./delivery-district-table";
import DeliveryDistrictFormField from "./form-field-two";

const AddDeliveryDistrict = () => {
  const {
    errors,
    handleSubmit,
    register,
    setStatus,
    handleSubmitDeliveryDistrict,
  } = useDeliveryDistrictSubmit();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitDeliveryDistrict)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <DeliveryDistrictFormField
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />
            <DeliveryDistrictFormField
              register={register}
              errors={errors}
              name="DeliveryCost"
              isReq={true}
              type="number"
            />

            <button className="tp-btn px-7 py-2">Add Delivery District</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* deliveryDistrict table start */}
        <DeliveryDistrictTables />
        {/* deliveryDistrict table end */}
      </div>
    </div>
  );
};

export default AddDeliveryDistrict;
