import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

type IPropType = {
  offerDate: {
    startDate: string | null;
    endDate: string | null;
  };
  setOfferDate: React.Dispatch<
    React.SetStateAction<{
      startDate: string | null;
      endDate: string | null;
    }>
  >;
  defaultValue?: {
    startDate: string | null;
    endDate: string | null;
  };
  isRange?: boolean;
};

const OfferDatePicker = ({
  offerDate,
  setOfferDate,
  defaultValue,
  isRange = true,
}: IPropType) => {
  const handleValueChange = (newValue: any) => {
    setOfferDate(newValue);
  };

  // Convert the startDate and endDate to Date objects if they are strings
  const convertToDate = (date: string | null) => {
    return date ? new Date(date) : null;
  };

  const formattedOfferDate = {
    startDate: convertToDate(offerDate.startDate),
    endDate: convertToDate(offerDate.endDate),
  };

  const formattedDefaultValue = defaultValue
    ? {
        startDate: convertToDate(defaultValue.startDate),
        endDate: convertToDate(defaultValue.endDate),
      }
    : null;

  return (
    <Datepicker
      useRange={isRange}
      inputClassName="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      value={formattedDefaultValue || formattedOfferDate}
      onChange={handleValueChange}
    />
  );
};

export default OfferDatePicker;
