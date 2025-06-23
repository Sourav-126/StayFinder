"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, Suspense } from "react";
import { CountrySelect } from "../_components/country-select";
import { CalenderInput } from "./calender";
import { Counter } from "./counter-input";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import type { CountrySelectValue } from "../types";

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  DETAILS: 2,
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  stepAt?: Step;
}

const SearchModalContent: React.FC<SearchModalProps> = ({
  isOpen,
  setIsOpen,
  stepAt,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<Step>(stepAt ?? STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = () => {
    if (step !== 0) setStep(((prev: Step) => prev - 1) as unknown as Step);
  };

  const onNext = () => {
    if (step === Object.keys(STEPS).length - 1) {
      const trackOfQueryParams: Record<string, string> = {
        ...(location?.value && { locationValue: location.value }),
        ...(guestCount && { guestCount: String(guestCount) }),
        ...(roomCount && { roomCount: String(roomCount) }),
        ...(childCount && { childCount: String(childCount) }),
        ...(dateRange.startDate &&
          dateRange.endDate && {
            startDate: dateRange.startDate.toISOString(),
            endDate: dateRange.endDate.toISOString(),
          }),
      };

      if (Object.keys(trackOfQueryParams).length === 0) return;

      const params = new URLSearchParams(searchParams.toString());
      const tempCat = params.get("cat");

      const queryString = new URLSearchParams(trackOfQueryParams).toString();
      const url = `/?${queryString}${tempCat ? `&cat=${tempCat}` : ""}`;

      setIsOpen(false);
      router.push(url);
    } else {
      setStep(((prev: Step) => prev + 1) as unknown as Step);
    }
  };

  const sourceToReturn = {
    [STEPS.LOCATION]: (
      <div>
        <h1>Where are you planning to visit?</h1>
        <CountrySelect
          value={location}
          onChange={(value: CountrySelectValue | null) => setLocation(value)}
        />
      </div>
    ),
    [STEPS.DATE]: (
      <div>
        <CalenderInput
          value={dateRange}
          onChange={(ranges) => {
            setDateRange(ranges.selection);
          }}
        />
      </div>
    ),
    [STEPS.DETAILS]: (
      <div>
        <div className="flex justify-between">
          <h3>How many Guests are joining?</h3>
          <Counter value={guestCount} onChange={setGuestCount} />
        </div>
        <div className="h-[0.4px] w-full bg-gray-500 my-5" />
        <div className="flex justify-between">
          <h3>How many Rooms do you want?</h3>
          <Counter value={roomCount} onChange={setRoomCount} />
        </div>
        <div className="h-[0.4px] w-full bg-gray-500 my-5" />
        <div className="flex justify-between">
          <h3>How many children?</h3>
          <Counter value={childCount} onChange={setChildCount} />
        </div>
      </div>
    ),
  };

  const labelForLastButton =
    step === Object.keys(STEPS).length - 1 ? "Search" : "Next";

  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-screen">
      <div className="w-full h-screen relative bg-black/40">
        <div className="modal-content absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px] rounded-lg shadow p-5">
          {sourceToReturn[step]}
          <X
            onClick={() => setIsOpen(false)}
            className="float-right top-4 absolute cursor-pointer right-4"
          />
          <div className="w-full flex justify-between p-5">
            <Button disabled={step === 0} onClick={onBack}>
              Back
            </Button>
            <Button
              onClick={onNext}
              className={
                step === Object.keys(STEPS).length - 1
                  ? "bg-red-400 hover:bg-red-300"
                  : "bg-zinc-300"
              }
            >
              {labelForLastButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export const SearchModal: React.FC<SearchModalProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchModalContent {...props} />
    </Suspense>
  );
};
