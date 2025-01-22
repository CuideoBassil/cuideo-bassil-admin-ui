import React, { useEffect } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ReactSelect from "react-select";
import ErrorMsg from "../../common/error-msg";

// prop type
type IPropType = {
  errors: FieldErrors<any>;
  control: Control;
  setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
  default_value?: string;
};

const ProductType = ({
  errors,
  control,
  default_value,
  setSelectProductType,
}: IPropType) => {
  // handleSelectProduct
  const handleSelectProduct = (value: string) => {
    setSelectProductType(value);
  };
  // set default product
  useEffect(() => {
    if (default_value) {
      setSelectProductType(default_value);
    }
  }, [default_value, setSelectProductType]);

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
              handleSelectProduct(selectedOption?.value);
            }}
            options={[
              { value: "electronics", label: "Electronics" },
              { value: "audio-and-tv", label: "Audio And TV" },
              {
                value: "air-conditioning-and-treatment",
                label: "Air Conditioning And Treatment",
              },
              { value: "cooking", label: "Cooking" },
              {
                value: "home-and-care-appliances",
                label: "Home And Care Appliances",
              },
              {
                value: "small-kitchen-appliances",
                label: "Small Kitchen Appliances",
              },
              {
                value: "laundry-and-washing",
                label: "Laundry And Washing",
              },
              {
                value: "personal-care",
                label: "Personal Care",
              },
              {
                value: "refrigeration-and-cooling",
                label: "Refrigeration And Cooling",
              },
            ]}
          />
        )}
      />
      <ErrorMsg msg={errors?.productType?.message as string} />
    </>
  );
};

export default ProductType;
