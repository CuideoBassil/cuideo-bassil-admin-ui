import React, { useEffect, useState } from "react";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

type IDateType = {
  startDate: Date | null;
  endDate: Date | null;
};

type IPropType = {
  offerDate: IDateType;
  setOfferDate: React.Dispatch<React.SetStateAction<IDateType>>;
  defaultValue?: { startDate: string | null; endDate: string | null };
  isRange?: boolean;
};

// Helper function to adjust dates
const adjustDateToStart = (date: Date) => {
  return new Date(date.setHours(0, 0, 0, 0)); // Set to 00:00:00
};

const adjustDateToEnd = (date: Date) => {
  return new Date(date.setHours(23, 59, 59, 999)); // Set to 23:59:59
};

const OfferDatePicker = ({
  offerDate,
  setOfferDate,
  defaultValue,
  isRange = true,
}: IPropType) => {
  const [internalDate, setInternalDate] = useState<DateValueType>(offerDate);

  // Sync defaultValue on mount
  useEffect(() => {
    if (defaultValue) {
      const start = defaultValue.startDate
        ? adjustDateToStart(new Date(defaultValue.startDate))
        : null;
      const end = defaultValue.endDate
        ? adjustDateToEnd(new Date(defaultValue.endDate))
        : null;

      setInternalDate({ startDate: start, endDate: end });
      setOfferDate({ startDate: start, endDate: end });
    }
  }, [defaultValue, setOfferDate]);

  const handleValueChange = (newValue: DateValueType) => {
    if (!newValue || !newValue.startDate || !newValue.endDate) return;

    const start = adjustDateToStart(new Date(newValue.startDate));
    const end = adjustDateToEnd(new Date(newValue.endDate));

    setInternalDate({ startDate: start, endDate: end });
    setOfferDate({ startDate: start, endDate: end });
  };

  return (
    <Datepicker
      useRange={isRange}
      inputClassName="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
      value={internalDate}
      onChange={handleValueChange}
    />
  );
};

export default OfferDatePicker;
