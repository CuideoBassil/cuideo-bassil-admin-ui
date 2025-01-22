import React, { useEffect } from "react";
import { Control, Controller } from "react-hook-form";
import ReactSelect from "react-select";

// prop type
type IPropType = {
  control: Control;
  setSection: React.Dispatch<React.SetStateAction<number>>;
  default_value?: number;
};

const FeaturedSection = ({ control, default_value, setSection }: IPropType) => {
  // handleSelectSection
  const handleSelectSection = (value: number) => {
    setSection(value);
  };
  // set default section
  useEffect(() => {
    if (default_value) {
      setSection(default_value);
    }
  }, [default_value, setSection]);

  return (
    <>
      <Controller
        name="section"
        control={control}
        rules={{
          required: default_value ? false : "Section is required!",
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
                    label: "1",
                    value: 1,
                  }
            }
            onChange={(selectedOption) => {
              field.onChange(selectedOption);
              console.log("vvv: ", selectedOption?.value);
              setSection(selectedOption?.value);
            }}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
            ]}
          />
        )}
      />
    </>
  );
};

export default FeaturedSection;
