"use client";

import { DateRange } from "react-date-range";
import type { Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarInputProps {
  value: Range;
  onChange: (ranges: RangeKeyDict) => void;
  disabledDates?: Date[];
  className?: string;
}

export const CalenderInput = ({
  value,
  onChange,
  disabledDates,
  className,
  ...props
}: CalendarInputProps) => {
  const currentRanges: Range[] = [value];

  return (
    <DateRange
      className={className}
      ranges={currentRanges}
      minDate={new Date()}
      onChange={onChange}
      disabledDates={disabledDates}
      months={1}
      direction="horizontal"
      showDateDisplay={false}
      {...props}
    />
  );
};
