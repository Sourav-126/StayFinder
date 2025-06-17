"use client";

import { useCountries } from "@/hooks/useCountries";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { title } from "process";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./country-select";
import { Input } from "@/components/ui/input";
import { Counter } from "./counter-input";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};
export default function BecomeAHostComponent() {
  const [step, setStep] = useState(STEPS.INFO);
  const setCustomValue = (title: string, value: string) => {
    setValue(title as any, value);
  };
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      category: "",
      location: "",
      description: "",
      roomCount: 1,
      childCount: 0,
      guestCount: 2,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const adultCount = watch("guestCount");
  console.log(location);
  const { getAll } = useCountries();

  let sourceAtStep = (
    <div>
      <h1>Which of this category defines your Property?</h1>
      <p>Pick a Category</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((each) => {
          return (
            <div
              onClick={() => {
                setCustomValue("category", each.label);
              }}
              className={cn(
                "bg-gray-100 flex flex-col p-5 rounded-lg border-gray-300/10 cursor-pointer",
                category === each.label
                  ? "bg-red-400/80 text-white"
                  : "bg-gray-100"
              )}
            >
              <each.icon />
              {each.label}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    sourceAtStep = (
      <div>
        <h1>Where is your property based out of?</h1>
        <CountrySelect
          value={location}
          onChange={(value: string) => setCustomValue("location", value)}
        />
      </div>
    );
  } else if (step == STEPS.INFO) {
    sourceAtStep = (
      <div>
        <Counter
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          value={childCount}
          onChange={(value) => setCustomValue("childCount", value)}
        />
        <Counter
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
      </div>
    );
  }
  return <div>{sourceAtStep}</div>;
}
