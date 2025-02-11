import { useGetAllBrandsQuery } from "@/redux/brand/brandApi";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { useGetAllCategoriesQuery } from "@/redux/category/categoryApi";
import ReactSelect, { GroupBase } from "react-select";
import ErrorMsg from "../../common/error-msg";
import Loading from "../../common/loading";
import ProductCategory from "./product-cat";
import ProductType from "./product-type";
// prop type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  setSelectBrand: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  setSelectCategory: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  selectProductType: { name: string; id: string };
  selectBrand: { name: string; id: string };
  selectCategory: { name: string; id: string };
  default_value?: {
    brand: string;
    productType: string;
    unit: string;
  };
};

const ProductTypeBrand = ({
  register,
  errors,
  control,
  setSelectProductType,
  selectProductType,
  setSelectBrand,
  setSelectCategory,
  default_value,
}: IPropType) => {
  const { data: brands, isError, isLoading } = useGetAllBrandsQuery();
  const {
    data: categories,
    isError: isErrorCategory,
    isLoading: isLoadingCategory,
  } = useGetAllCategoriesQuery();

  const [hasDefaultValues, setHasDefaultValues] = useState<boolean>(false);
  // default value set
  useEffect(() => {
    if (
      default_value?.productType &&
      default_value.brand &&
      !hasDefaultValues
    ) {
      const brand = brands?.result.find((b) => b.name === default_value.brand);
      const category = categories?.result.find(
        (c) => c.parent === default_value?.productType
      );
      if (brand) {
        setSelectBrand({ id: brand._id as string, name: default_value.brand });
        setSelectCategory({
          id: category?._id as string,
          name: default_value.productType,
        });
        setSelectProductType({
          name: default_value.productType,
          id: "1",
        });
        setHasDefaultValues(true);
      }
    }
  }, [
    default_value,
    brands,
    hasDefaultValues,
    setSelectBrand,
    setSelectProductType,
  ]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Loading...</p>
        <Loading loading={isLoading} spinner="scale" />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && isError && brands?.result.length === 0) {
    content = <ErrorMsg msg="No Category Found" />;
  }

  if (!isLoading && !isError && brands?.success) {
    const brandItems = brands.result;

    // handleBrandChange
    const handleBrandChange = (selectBrand: string) => {
      const brand = brandItems.find((b) => b.name === selectBrand);
      setSelectBrand({ id: brand?._id as string, name: selectBrand });
    };
    const option = brandItems.map((b) => ({
      value: b.name,
      label: b.name,
    })) as unknown as readonly (string | GroupBase<string>)[];

    content = (
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Brands</p>
        <Controller
          name="brand"
          control={control}
          rules={{
            required: default_value?.brand ? false : "Brand is required!",
          }}
          render={({ field }) => (
            <ReactSelect
              {...field}
              value={field.value}
              defaultValue={
                default_value
                  ? {
                      label: default_value.brand,
                      value: default_value.brand,
                    }
                  : {
                      label: "Select..",
                      value: 0,
                    }
              }
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                handleBrandChange(selectedOption?.value);
              }}
              options={option}
            />
          )}
        />
        <ErrorMsg msg={errors?.brand?.message as string} />
        <span className="text-tiny leading-4">Set the product Brand.</span>
      </div>
    );
  }
  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6">
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Product Type</p>
          <ProductType
            control={control}
            errors={errors}
            default_value={default_value?.productType}
            setSelectProductType={setSelectProductType}
            selectProductType={selectProductType}
          />
          <span className="text-tiny leading-4">
            Set the product ProductType.
          </span>
        </div>
        {selectProductType.name !== "" && (
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Category</p>
            <ProductCategory
              control={control}
              errors={errors}
              default_value={default_value?.productType}
              setSelectCategory={setSelectProductType}
              selectCategory={selectProductType}
              productType={selectProductType.name}
            />
            <span className="text-tiny leading-4">
              Set the product Category.
            </span>
          </div>
        )}

        {content}

        {/* <div className="mb-5">
          <p className="mb-0 text-base text-black">
            Unit <span className="text-red">*</span>
          </p>
          <input
            id="unit"
            {...register("unit", { required: `unit is required!` })}
            defaultValue={default_value?.unit}
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            type="text"
            placeholder="Product unit"
          />
          <ErrorMsg msg={errors?.unit?.message as string} />
          <span className="text-tiny leading-4">Set the unit of product.</span>
        </div> */}
      </div>
    </div>
  );
};

export default ProductTypeBrand;
