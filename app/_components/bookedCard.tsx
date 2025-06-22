"use client";

import ListingsCard from "./listings-card";
import { deleteBooking } from "../actions/deleteBooking";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

interface Listing {
  id: string;
  imageSrc?: string | undefined;
  title?: string;
  price?: number;
  locationvalue?: string;
  description?: string | null;
  category?: string;
  roomCount?: number;
  childCount?: number;
  guestCount?: number;
  userId?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface Reservation {
  id: string;
  listingId: string | null;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  userId: string;
  Listing: Listing | null;
}

interface BookedCardProps {
  reservation: Reservation;
  index?: number;
}

export const BookedCard: React.FC<BookedCardProps> = ({ reservation }) => {
  const router = useRouter();

  const cancelReservation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await deleteBooking(reservation.id);
    if (res?.ok) {
      toast.success("Booking Deleted");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  // Guard against null Listing
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
        reservationsData={{ price: reservation.totalPrice }}
        listing={reservation.Listing}
        showSecondaryBtn={true}
        secondaryBtnLabel="Cancel Booking"
        onAction={cancelReservation}
      />
    </div>
  );
};
