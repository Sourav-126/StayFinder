"use client";

import { useEffect, useMemo, useState } from "react";
import { CalenderInput } from "./calender";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";
import { setReservation } from "../actions/reservation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RangeKeyDict } from "react-date-range";

interface Reservation {
  startDate: Date;
  endDate: Date;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface ReservationComponent {
  pricePerDay: number;
  listingId: string;
  reservation: Reservation[];
}

export const ReservationComponent = ({
  pricePerDay,
  listingId,
  reservation,
}: ReservationComponent) => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [total, setTotal] = useState(pricePerDay);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: reservation.startDate,
        end: reservation.endDate,
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const countDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (pricePerDay && countDays > 0) {
        setTotal(countDays * pricePerDay);
      } else {
        setTotal(pricePerDay);
      }
    }
  }, [pricePerDay, dateRange]);

  const handleDateChange = (ranges: RangeKeyDict) => {
    const selection = ranges["selection"];

    if (selection?.startDate && selection?.endDate) {
      setDateRange({
        startDate: selection.startDate,
        endDate: selection.endDate,
        key: "selection",
      });
    }
  };

  const handleReservation = async () => {
    try {
      const res = await setReservation({
        listingId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        price: total,
      });

      if (res?.ok) {
        toast.success("Reservation Done!");
        router.push("/bookings");
      }
      router.refresh();
    } catch (error: unknown) {
      return { ok: false, message: "missing fields" };
    }
  };
  return (
    <div className=" flex flex-col gap-2 justify-center items-center pt-4">
      <CalenderInput
        className="w-full flex justify-center"
        value={dateRange}
        onChange={handleDateChange}
        disabledDates={disabledDates}
      />

      <Button onClick={handleReservation} className="mt-4 cursor-pointer">
        Pay <IndianRupee className="ml-1" />
        {total}
      </Button>
    </div>
  );
};
