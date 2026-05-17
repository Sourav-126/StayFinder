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
import { motion } from "framer-motion";


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

  const stepHeadings = {
    [STEPS.LOCATION]: "Where are you planning to visit?",
    [STEPS.DATE]: "When is your trip?",
    [STEPS.DETAILS]: "Who is joining?",
  };

  const sourceToReturn = {
    [STEPS.LOCATION]: (
      <div className="space-y-2">
        <p className="text-sm text-gray-500 mb-4">Select a destination country to start exploring available stays.</p>
        <CountrySelect
          value={location}
          onChange={(value: CountrySelectValue | null) => setLocation(value)}
        />
      </div>
    ),
    [STEPS.DATE]: (
      <div>
        <p className="text-sm text-gray-500 mb-4 text-center">Select your check-in and check-out dates.</p>
        <div className="w-full overflow-x-auto flex justify-center max-w-full pb-2 scrollbar-none">
          <CalenderInput
            value={dateRange}
            onChange={(ranges) => {
              setDateRange(ranges.selection);
            }}
          />
        </div>
      </div>
    ),
    [STEPS.DETAILS]: (
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4">Specify the number of guests and rooms required.</p>
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-sm xs:text-base font-medium text-gray-700">How many Guests are joining?</h3>
          <Counter value={guestCount} onChange={setGuestCount} />
        </div>
        <div className="h-[0.4px] w-full bg-gray-200" />
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-sm xs:text-base font-medium text-gray-700">How many Rooms do you want?</h3>
          <Counter value={roomCount} onChange={setRoomCount} />
        </div>
        <div className="h-[0.4px] w-full bg-gray-200" />
        <div className="flex justify-between items-center gap-3">
          <h3 className="text-sm xs:text-base font-medium text-gray-700">How many children?</h3>
          <Counter value={childCount} onChange={setChildCount} />
        </div>
      </div>
    ),
  };

  const labelForLastButton =
    step === Object.keys(STEPS).length - 1 ? "Search" : "Next";


  return isOpen ? (
    <div className="fixed top-0 left-0 w-full h-screen z-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full h-screen relative bg-black/25 backdrop-blur-sm xs:backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: "-47%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="modal-content absolute left-1/2 top-1/2 bg-white w-[92%] xs:w-[85%] md:w-3/5 max-w-2xl min-h-[350px] rounded-lg shadow-xl p-5 xs:p-6 flex flex-col justify-between"
        >
          <div className="flex flex-col justify-between flex-1">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-lg xs:text-xl font-bold text-gray-800">
                  {stepHeadings[step]}
                </h2>
                <X
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-gray-500 hover:text-gray-800 transition-colors w-5 h-5"
                />
              </div>
              <div className="py-2">
                {sourceToReturn[step]}
              </div>
            </div>

            <div className="w-full flex justify-between pt-4 mt-6 border-t">
              <Button disabled={step === 0} onClick={onBack} variant="outline" className="cursor-pointer hover:bg-gray-100">
                Back
              </Button>
              <Button
                onClick={onNext}
                className={
                  step === Object.keys(STEPS).length - 1
                    ? "bg-red-400 hover:bg-red-500 text-white cursor-pointer transition-colors"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors"
                }
              >
                {labelForLastButton}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
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
