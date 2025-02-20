import { useGetAllProductTypesQuery } from "@/redux/product-type/productTypeApi";
import React, { useCallback, useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactSelect from "react-select";
import ErrorMsg from "../../common/error-msg";

// prop type
type IPropType = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  selectProductType: { name: string; id: string };
  default_value?: string;
};

const ProductType = ({
  errors,
  control,
  default_value,
  setSelectProductType,
  selectProductType,
}: IPropType) => {
  const {
    data: productTypes,
    isError,
    isLoading,
  } = useGetAllProductTypesQuery();
  // handleSelectProduct
  const handleSelectProduct = useCallback(
    (selectedOption: { value: string }) => {
      const productType = productTypes?.result?.find(
        (b) => b.name === selectedOption.value
      );
      setSelectProductType({
        id: productType?._id || "",
        name: selectedOption.value,
      });
    },
    [productTypes, setSelectProductType]
  );
  // const handleSelectProduct = (selectedOption: string) => {
  //   setSelectProductType({ name: value, id: "1" });
  // };
  // set default product
  // useEffect(() => {
  //   if (default_value) {
  //     setSelectProductType({ name: default_value, id: "1" });
  //   }
  // }, [default_value, setSelectProductType]);

  return (
    <>
      <Controller
        name="productType"
        control={control}
        rules={{
          required: default_value ? false : "productType is required!",
        }}
        render={({ field }) => (
          <ReactSelect
            {...field}
            value={field.value}
            defaultValue={
              default_value
                ? {
                    label: default_value,
                    value: default_value,
                  }
                : {
                    label: "Select..",
                    value: 0,
                  }
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              handleSelectProduct(selectedOption);
            }}
            options={productTypes?.result.map((type) => {
              return { value: type.name, label: type.name };
            })}
          />
        )}
      />
      <ErrorMsg msg={errors?.productType?.message as string} />
    </>
  );
};

export default ProductType;
