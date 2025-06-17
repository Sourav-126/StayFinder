import useCountries from "@/hooks/useCountries";
import React from "react";
import Select from "react-select";
import Flag from "react-world-flags";
function CountrySelect({ value, onChange }: { value: any; onChange: any }) {
  const { getAll } = useCountries();
  return (
    <div>
      <Select
        placeholder="Choose a Location"
        isClearable
        options={getAll()}
        onChange={(value) => onChange(value)}
        value={value}
        formatOptionLabel={(option) => (
          <div className="flex gap-2 items-center p-1">
            <Flag code={option.value} className=" w-5" />
            {option.label}
          </div>
        )}
      />
    </div>
  );
}

export default CountrySelect;
