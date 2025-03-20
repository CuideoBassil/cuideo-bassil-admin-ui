"use client";
import useProductTypeSubmit from "@/hooks/useProductTypeSubmit";
import GlobalImgUpload from "../category/global-img-upload";
import FormField from "./form-field-two";
import ProductTypeTables from "./product-type-table";

const AddProductType = () => {
  const {
    errors,
    handleSubmit,
    register,
    handleSubmitProductType,
    setLogo,
    isSubmitted,
    setIsSubmitted,
  } = useProductTypeSubmit();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitProductType)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <GlobalImgUpload
              isSubmitted={isSubmitted}
              setImage={setLogo}
              image=""
              setIsSubmitted={setIsSubmitted}
            />{" "}
            <FormField
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />
            {/* Form Field */}
            <button className="tp-btn px-7 py-2">Add Product Type</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        {/* brand table start */}
        <ProductTypeTables />
        {/* brand table end */}
      </div>
    </div>
  );
};

export default AddProductType;
