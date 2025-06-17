import { CircleMinus, CirclePlus } from "lucide-react";
import { useCallback } from "react";

//Give the types to the props
export const Counter = ({ value, onChange }) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value == 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className="flex flex-col items-center w-fit p-4  gap-2 rounded-lg  border-2  border-gray-500/10 bg-gray-100 ">
      <div className="cursor-pointer" onClick={onAdd}>
        <CirclePlus />
      </div>
      {value}
      <div className="cursor-pointer" onClick={onReduce}>
        <CircleMinus />
      </div>
    </div>
  );
};
