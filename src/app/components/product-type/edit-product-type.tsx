"use client";
import React from "react";
import ErrorMsg from "../common/error-msg";
import ProductTypeTables from "./product-type-table";
import Loading from "../common/loading";
import FormField from "./form-field-two";
import { useGetProductTypeQuery } from "@/redux/product-type/productTypeApi";
import useProductTypeSubmit from "@/hooks/useProductTypeSubmit";
import CategoryImgUpload from "../category/global-img-upload";

const EditProductType = ({ id }: { id: string }) => {
  const {
    errors,
    handleSubmit,
    register,
    setLogo,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditProductType,
  } = useProductTypeSubmit();
  // get productType
  const {
    data: productType,
    isLoading,
    isError,
    error,
  } = useGetProductTypeQuery(id);

  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (!productType && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (productType && !isError) {
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form
          onSubmit={handleSubmit((data) =>
            handleSubmitEditProductType(data, id)
          )}
        >
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* Form Field */}
            <CategoryImgUpload
              isSubmitted={isSubmitted}
              setImage={setLogo}
              image={productType.image ? productType.image : ""}
              setIsSubmitted={setIsSubmitted}
              default_img={productType.image}
            />
            <FormField
              default_val={productType.name}
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
        {/* ProductType table start */}
        <ProductTypeTables />
        {/* ProductType table end */}
      </div>
    </div>
  );
};

export default EditProductType;
