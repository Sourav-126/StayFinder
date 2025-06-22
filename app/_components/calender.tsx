import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const CalenderInput = ({ value, onChange, ...props }) => {
  const dates = {
    startDate: new Date(),
    endDate: new Date(),

    key: "selection",
  };

  const currentRanges = value ? [value] : [dates];

  return (
    <DateRangePicker
      ranges={currentRanges}
      minDate={new Date()}
      staticRanges={[]}
      inputRanges={[]}
      onChange={onChange}
      disabledDates={props.disabledDates}
      months={1} // ✅ Show only 1 month (remove if you want 2 months)
      direction="horizontal" // ✅ Layout direction
      {...props}
    />
  );
};
