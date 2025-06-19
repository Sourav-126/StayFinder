import { DateRangePicker } from "react-date-range";

// Import the required CSS files
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

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
      onChange={onChange}
      {...props}
    />
  );
};
