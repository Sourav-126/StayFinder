"use client";
import ListingsCard from "./listings-card";
import { deleteBooking } from "../actions/deleteBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const BookedCard = ({ reservation, index }) => {
  const router = useRouter();
  const cancelReservation = async (e) => {
    e.preventDefault();
    const res = await deleteBooking(reservation.id);
    if (res?.ok) {
      toast.success("Booking Deleted");
      router.refresh();
    } else {
      toast.error("Something went Wrong");
    }
  };
  return (
    <div>
      <ListingsCard
        reservationsData={reservation.price}
        listing={reservation.listing}
        showSecondaryBtn={true}
        secondaryBtnLabel="Cancel Booking"
        onAction={cancelReservation}
      />
    </div>
  );
};
