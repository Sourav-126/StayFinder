import { CircleMinus, CirclePlus } from "lucide-react";
import { useCallback } from "react";

export const Counter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value <= 0) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center gap-4 bg-gray-50 border border-gray-200/80 rounded-full px-3.5 py-1.5 select-none shrink-0 shadow-sm">
      <button 
        type="button"
        disabled={value <= 0}
        onClick={onReduce}
        className="cursor-pointer text-gray-500 hover:text-rose-500 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none"
      >
        <CircleMinus className="w-5.5 h-5.5 stroke-[1.75]" />
      </button>
      <span className="font-bold text-gray-800 text-sm min-w-[20px] text-center">{value}</span>
      <button 
        type="button"
        onClick={onAdd}
        className="cursor-pointer text-gray-500 hover:text-rose-500 transition-colors focus:outline-none"
      >
        <CirclePlus className="w-5.5 h-5.5 stroke-[1.75]" />
      </button>
    </div>
  );
};
