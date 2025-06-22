"use client";
import ListingsCard from "./listings-card";
import { deleteBooking } from "../actions/deleteBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const BookedCard = ({ reservation, index }) => {
  const router = useRouter();

  const cancelReservation = async (e: any) => {
    e.preventDefault();
    const res = await deleteBooking(reservation.id);
    if (res?.ok) {
      toast.success("Booking Deleted");
      router.refresh();
    } else {
      toast.error("Something went Wrong");
    }
  };

  // 🚨 Guard against null Listing
  if (!reservation?.Listing) {
    return (
      <div className="border p-4 rounded text-center text-sm text-gray-600">
        No property info available for this reservation.
      </div>
    );
  }

  return (
    <div>
      <ListingsCard
        reservationsData={reservation.totalPrice}
        listing={reservation.Listing}
        showSecondaryBtn={true}
        secondaryBtnLabel="Cancel Booking"
        onAction={cancelReservation} // ✅ FIXED: was previously () => cancelReservation
      />
    </div>
  );
};
