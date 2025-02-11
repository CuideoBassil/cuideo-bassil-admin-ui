import { useGetAllCategoriesQuery } from "@/redux/category/categoryApi";
import React, { useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactSelect from "react-select";
import ErrorMsg from "../../common/error-msg";

// prop category
type IPropCategory = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectCategory: React.Dispatch<
    React.SetStateAction<{ name: string; id: string }>
  >;
  selectCategory: { name: string; id: string };
  default_value?: string;
  productType?: string;
};

const ProductCategory = ({
  errors,
  control,
  default_value,
  setSelectCategory,
  selectCategory,
  productType,
}: IPropCategory) => {
  const {
    data: categories,
    isError: isErrorCategory,
    isLoading: isLoadingCategory,
  } = useGetAllCategoriesQuery();

  // handleSelect
  const handleSelect = (value: string) => {
    setSelectCategory({ name: value, id: "1" });
  };
  // set default
  useEffect(() => {
    if (default_value) {
      setSelectCategory({ name: default_value, id: "1" });
    }
  }, [default_value, setSelectCategory]);

  return (
    <>
      <Controller
        name="Category"
        control={control}
        rules={{
          required: default_value ? false : "Category is required!",
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
              handleSelect(selectedOption?.value);
            }}
            options={categories?.result
              .filter(
                (category) =>
                  category.productType === productType?.toLocaleLowerCase()
              )
              .map((category) => ({
                value: category._id,
                label: category.parent,
              }))}
          />
        )}
      />
      <ErrorMsg msg={errors?.Category?.message as string} />
    </>
  );
};

export default ProductCategory;
