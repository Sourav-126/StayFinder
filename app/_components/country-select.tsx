import useCountries from "@/hooks/useCountries";
import { CountrySelectValue } from "../types";
import Select from "react-select";
import Image from "next/image";

type CountrySelectProps = {
  value: CountrySelectValue | null;
  onChange: (value: CountrySelectValue | null) => void;
};

export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();

  return (
    <Select<CountrySelectValue>
      placeholder="Choose a Location"
      isClearable
      options={getAll()}
      onChange={(option) => onChange(option)}
      value={value}
      formatOptionLabel={(option) => (
        <div className="flex gap-2 items-center p-1">
          <Image
            src={`https://flagcdn.com/24x18/${option.value.toLowerCase()}.png`}
            className="w-5 h-[18px]"
            alt={`${option.label} flag`}
            width={24}
            height={18}
          />
          {option.label}
        </div>
      )}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e.value}
    />
  );
};
