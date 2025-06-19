"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import CountrySelect from "./country-select";
import { CalenderInput } from "./calender";
import { Counter } from "./counter-input";
import { useRouter } from "next/navigation";

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  DETAILS: 2,
};

interface Location {
  value: string;
}
export const SearchModal = ({ isOpen, setIsOpen, stepAt }) => {
  const router = useRouter();
  const [step, setStep] = useState(stepAt || STEPS.LOCATION);
  const [location, setLocation] = useState<Location>();
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [dateRange, setDateRange] = useState({
    startRange: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = () => {
    if (step != 0) setStep((previousStep) => previousStep - 1);
  };

  const onNext = () => {
    if (step == Object.keys(STEPS).length - 1) {
      const trackOfQueryParams = {
        ...(location?.value && { locationValue: location?.value }),
        ...(guestCount && { guestCount: guestCount }),
        ...(roomCount && { roomCount: roomCount }),
        ...(childCount && { childCount: childCount }),
        ...(dateRange.startRange &&
          dateRange.endDate && {
            startDate: dateRange.startRange,
            endDate: dateRange.endDate,
          }),
      }; // queyr modified ends here

      if (Object.keys(trackOfQueryParams).length === 0) return;

      const queryString = Object.keys(trackOfQueryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              trackOfQueryParams[key]
            )}`
        )
        .join("&");

      const url = `/?${queryString}`;
      setIsOpen(false);
      router.push(url);
    }
    setStep((previousStep) => previousStep + 1);
  };
  const sourceToReturn = {
    [STEPS.LOCATION]: (
      <div>
        {" "}
        <h1> Where are you planning to visit? </h1>
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value)}
        />{" "}
      </div>
    ),
    [STEPS.DATE]: (
      <div>
        {" "}
        <CalenderInput
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
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
    step == Object.keys(STEPS).length - 1 ? "Search" : "Next";
  return (
    <>
      {isOpen ? (
        <div className="fixed top-0 left-0 w-full h-screen">
          <div className="w-full h-screen relative bg-black/40 ">
            <div className=" modal-content absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px] rounded-lg shadow p-5">
              {sourceToReturn[step]}
              <X
                onClick={() => {
                  setIsOpen(false);
                }}
                className="float-right top-4 absolute cursor-pointer right-4 "
              />
              <div className="w-full flex justify-between p-5 ">
                <Button
                  disabled={step == 0}
                  onClick={onBack}
                  className="cursor-pointer"
                >
                  {" "}
                  Back{" "}
                </Button>
                <Button
                  onClick={onNext}
                  className={
                    step === Object.keys(STEPS).length - 1 &&
                    "bg-red-400 hover:bg-red-300"
                  }
                >
                  {labelForLastButton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
